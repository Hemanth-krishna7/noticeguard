import fs from 'fs';
import path from 'path';

async function runTests() {
  const tests = [
    { label: 'Test E: v1 -> OUTDATED', file: 'physical_scan_sample_e.jpg', expected: 'OUTDATED' },
    { label: 'Test F: v2 -> CURRENT', file: 'physical_scan_sample_f.jpg', expected: 'CURRENT' },
    { label: 'Test G: modified -> MODIFIED', file: 'physical_scan_sample_g.jpg', expected: 'MODIFIED' },
    { label: 'Test H: unrelated -> UNVERIFIED', file: 'physical_scan_sample_h.jpg', expected: 'UNVERIFIED' },
  ];

  console.log('========================================================');
  console.log('OFFICIAL TEST SUITE: TESTS E, F, G, H (MULTIPART POST)');
  console.log('Endpoint: POST http://localhost:5000/api/verify');
  console.log('Conditions: multipart/form-data, NO demoNoticeTag, neutral filenames');
  console.log('========================================================\n');

  for (const t of tests) {
    const filePath = path.resolve('test_fixtures', t.file);
    const fileBytes = fs.readFileSync(filePath);

    const formData = new FormData();
    const blob = new Blob([fileBytes], { type: 'image/jpeg' });
    formData.append('image', blob, 'unlabeled_upload_scan.jpg');
    formData.append('imageName', 'unlabeled_upload_scan.jpg');
    formData.append('source', 'camera');
    // Note: Absolutely NO demoNoticeTag passed!

    const startTime = Date.now();
    const res = await fetch('http://localhost:5000/api/verify', {
      method: 'POST',
      body: formData
    });

    const elapsed = Date.now() - startTime;
    const data = await res.json();

    console.log(`=== ${t.label} ===`);
    console.log(`Input File:       ${t.file} (${fileBytes.length} bytes)`);
    console.log(`HTTP Status:      ${res.status} (${elapsed}ms)`);
    console.log(`Status Decision:  ${data.status}`);
    console.log(`Expected Status:  ${t.expected}`);
    console.log(`Result:           ${data.status === t.expected ? 'PASSED [OK]' : 'FAILED [X]'}`);
    console.log(`Matched:          ${data.matched}`);
    console.log(`Confidence Level: ${data.confidence}`);
    console.log(`Notice ID/Title:  ${data.notice ? `${data.notice.id} ("${data.notice.title}")` : 'None'}`);
    console.log(`Identified Ver:   ${data.identifiedVersion ? `${data.identifiedVersion.versionNumber} (${data.identifiedVersion.documentRef})` : 'None'}`);
    console.log(`Current Ver:      ${data.currentVersion ? `${data.currentVersion.versionNumber} (${data.currentVersion.documentRef})` : 'None'}`);
    if (data.changes && data.changes.length > 0) {
      console.log(`Changes Detected: ${data.changes.length} items`);
      data.changes.forEach((c) => {
        console.log(`  - ${c.field}: "${c.from}" -> "${c.to}"${c.critical ? ' [CRITICAL]' : ''}`);
      });
    }
    if (data.discrepancyDetails) {
      console.log(`Discrepancy:      ${data.discrepancyDetails}`);
    }
    if (data.guidance) {
      console.log(`Guidance:         ${data.guidance}`);
    }
    if (data.ocrEvidence) {
      console.log(`OCR Evidence:     ${JSON.stringify(data.ocrEvidence)}`);
    }
    console.log('\n');
  }
}

runTests().catch(console.error);
