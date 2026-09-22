Add-Type -AssemblyName System.Drawing

function Create-NoticeImage {
    param (
        [string]$FilePath,
        [string]$Header,
        [string]$Subheader,
        [string]$Title,
        [string[]]$BodyLines,
        [string]$Signatory,
        [string]$DocRef
    )

    $width = 1200
    $height = 1600
    $bmp = New-Object System.Drawing.Bitmap $width, $height
    $g = [System.Drawing.Graphics]::FromImage($bmp)
    $g.SmoothingMode = [System.Drawing.Drawing2D.SmoothingMode]::AntiAlias
    $g.TextRenderingHint = [System.Drawing.Text.TextRenderingHint]::AntiAliasGridFit

    # Paper background
    $paperColor = [System.Drawing.Color]::FromArgb(254, 254, 252)
    $g.Clear($paperColor)

    # Border
    $borderPen = New-Object System.Drawing.Pen ([System.Drawing.Color]::FromArgb(180, 180, 180)), 3
    $g.DrawRectangle($borderPen, 30, 30, $width - 60, $height - 60)

    # Fonts with explicit [float] size
    $fontHeader = New-Object System.Drawing.Font ('Arial', [float]28, [System.Drawing.FontStyle]::Bold)
    $fontSub = New-Object System.Drawing.Font ('Arial', [float]16, [System.Drawing.FontStyle]::Bold)
    $fontTitle = New-Object System.Drawing.Font ('Arial', [float]24, [System.Drawing.FontStyle]::Bold)
    $fontBody = New-Object System.Drawing.Font ('Arial', [float]18, [System.Drawing.FontStyle]::Regular)
    $fontBodyBold = New-Object System.Drawing.Font ('Arial', [float]18, [System.Drawing.FontStyle]::Bold)
    $fontRef = New-Object System.Drawing.Font ('Courier New', [float]16, [System.Drawing.FontStyle]::Bold)
    $fontSign = New-Object System.Drawing.Font ('Arial', [float]18, [System.Drawing.FontStyle]::Italic)

    $brushBlack = [System.Drawing.Brushes]::Black
    $brushDark = New-Object System.Drawing.SolidBrush ([System.Drawing.Color]::FromArgb(30, 30, 30))
    $brushGray = New-Object System.Drawing.SolidBrush ([System.Drawing.Color]::FromArgb(80, 80, 80))

    # Center-aligned StringFormat
    $sfCenter = New-Object System.Drawing.StringFormat
    $sfCenter.Alignment = [System.Drawing.StringAlignment]::Center

    # Top Header
    $g.DrawString($Header, $fontHeader, $brushBlack, [float]($width / 2), [float]70, $sfCenter)
    $g.DrawString($Subheader, $fontSub, $brushGray, [float]($width / 2), [float]125, $sfCenter)

    # Divider line
    $dividerPen = New-Object System.Drawing.Pen ([System.Drawing.Color]::FromArgb(100, 100, 100)), 2
    $g.DrawLine($dividerPen, 60, 165, $width - 60, 165)

    # Title
    $g.DrawString($Title, $fontTitle, $brushBlack, [float]($width / 2), [float]200, $sfCenter)

    # Body
    $y = 280
    foreach ($line in $BodyLines) {
        if ($line -like "*:*") {
            $g.DrawString($line, $fontBodyBold, $brushDark, [float]90, [float]$y)
        } else {
            $g.DrawString($line, $fontBody, $brushDark, [float]90, [float]$y)
        }
        $y += 44
    }

    # Divider line before signatory
    $g.DrawLine($dividerPen, 60, 1380, $width - 60, 1380)

    # Signatory and Ref
    if ($Signatory) {
        $g.DrawString($Signatory, $fontSign, $brushDark, [float]90, [float]1420)
    }
    if ($DocRef) {
        $g.DrawString("DOCUMENT REF: $DocRef", $fontRef, $brushGray, [float]90, [float]1470)
    }

    # Save as JPEG
    $bmp.Save($FilePath, [System.Drawing.Imaging.ImageFormat]::Jpeg)
    $g.Dispose()
    $bmp.Dispose()
    Write-Output "Successfully generated: $FilePath"
}

# Image E: Exam v1 (Outdated)
Create-NoticeImage -FilePath "c:\HEMU_CODING\MyProjects\NoticeGuard\backend\test_fixtures\physical_scan_sample_e.jpg" `
    -Header "CITY CENTRAL UNIVERSITY" `
    -Subheader "OFFICE OF THE CONTROLLER OF EXAMINATIONS" `
    -Title "NOTIFICATION NO. CCU/EXAM/2026/089" `
    -BodyLines @(
        "END SEMESTER EXAMINATION SCHEDULE - FALL 2026",
        "",
        "All registered candidates are hereby notified that the End Semester",
        "Examinations for Fall 2026 will commence on Monday, October 12, 2026.",
        "",
        "Examination Details:",
        "- Reporting Time: 08:30 AM",
        "- Examination Timing: 09:00 AM - 12:00 PM",
        "- Primary Examination Venue: Hall 302, Main Academic Block",
        "- Allowed Materials: Non-programmable calculator, University ID Card",
        "",
        "Students without physical identity cards will not be permitted entry.",
        "Seating charts will be posted outside Hall 302 on exam morning."
    ) `
    -Signatory "Dr. Aris Thorne, Controller of Examinations" `
    -DocRef "CCU-EXAM-2026-089-V1"

# Image F: Exam v2 (Current)
Create-NoticeImage -FilePath "c:\HEMU_CODING\MyProjects\NoticeGuard\backend\test_fixtures\physical_scan_sample_f.jpg" `
    -Header "CITY CENTRAL UNIVERSITY" `
    -Subheader "OFFICE OF THE CONTROLLER OF EXAMINATIONS" `
    -Title "ADDENDUM / REVISED NOTIFICATION NO. CCU/EXAM/2026/089-R2" `
    -BodyLines @(
        "REVISED END SEMESTER EXAMINATION SCHEDULE & VENUE RELOCATION",
        "",
        "ATTENTION ALL STUDENTS: Due to unscheduled emergency electrical upgrades",
        "in the Main Academic Block, the schedule published on Oct 01 is revised.",
        "",
        "Revised Examination Details:",
        "- Revised Date: Thursday, October 15, 2026 (Postponed from Oct 12)",
        "- Reporting Time: 10:00 AM",
        "- Examination Timing: 10:30 AM - 01:30 PM",
        "- Relocated Venue: Hall 408, Science & Technology Annex Wing (2nd Floor)",
        "",
        "Students must report to Hall 408. Notice posted in Hall 302 is no longer valid.",
        "Seating allocations remain identical to published roll-number registry."
    ) `
    -Signatory "Dr. Aris Thorne, Controller of Examinations" `
    -DocRef "CCU-EXAM-2026-089-V2"

# Image G: Exam Modified (Tampered / Altered Discrepancy)
Create-NoticeImage -FilePath "c:\HEMU_CODING\MyProjects\NoticeGuard\backend\test_fixtures\physical_scan_sample_g.jpg" `
    -Header "CITY CENTRAL UNIVERSITY" `
    -Subheader "OFFICE OF THE CONTROLLER OF EXAMINATIONS" `
    -Title "END SEMESTER EXAMINATION TIMETABLE" `
    -BodyLines @(
        "UNOFFICIAL STUDENT CIRCULAR: SEMESTER TIMETABLE",
        "",
        "Attention all registered classes and candidate students:",
        "Please note alternate examination guidelines circulating on campus:",
        "",
        "Examination Details:",
        "- Stated Date: Thursday, October 22, 2026",
        "- Stated Timing: 02:00 PM - 05:00 PM",
        "- Stated Venue: Hall 101, Lecture Theater",
        "",
        "Candidates must verify identity cards at hall entrance.",
        "NoticeGuard registry check will detect content divergence."
    ) `
    -Signatory "Dr. Aris Thorne, Controller of Examinations" `
    -DocRef "CCU-EXAM-2026-UNOFFICIAL"

# Image H: Unrelated Image (Cafe / Menu)
Create-NoticeImage -FilePath "c:\HEMU_CODING\MyProjects\NoticeGuard\backend\test_fixtures\physical_scan_sample_h.jpg" `
    -Header "SUNRISE ARTISAN BAKERY & CAFE" `
    -Subheader "CAMPUS AVENUE OUTLET - SPECIAL PROMOTIONS" `
    -Title "WEEKLY ARTISAN SPECIALS & MENU" `
    -BodyLines @(
        "FRESH BAKERY AND SPECIALTY COFFEE ROASTS",
        "",
        "Join us for freshly baked morning pastries and specialty roasts:",
        "",
        "Cafe Specials:",
        "- Freshly Brewed Organic Espresso and Cappuccino",
        "- Handcrafted Butter Croissants and Cinnamon Swirls",
        "- Avocado Sourdough Toast with microgreens",
        "- Operational Hours: 07:00 AM to 06:00 PM Daily",
        "",
        "Student discount of 10% applicable with university pass.",
        "Free high-speed campus Wi-Fi available on all cafe tables."
    ) `
    -Signatory "Sunrise Hospitality Group" `
    -DocRef "SUNRISE-CAFE-MENU-2026"
