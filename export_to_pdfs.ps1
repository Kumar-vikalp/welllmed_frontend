param(
    [string]$RootPath = (Get-Location).Path,
    [string]$OutputDir = (Join-Path (Get-Location).Path "code_pdfs")
)

$extensions = @("*.js", "*.jsx", "*.ts", "*.tsx", "*.html", "*.css", "*.scss", "*.json", "*.md")
$skipFolders = @("node_modules", ".git", "dist", "build", ".next", "coverage", ".vscode", "output_pdfs")

if (-not (Test-Path $OutputDir)) {
    New-Item -ItemType Directory -Path $OutputDir | Out-Null
}

$useWk = $false
if (Get-Command "wkhtmltopdf" -ErrorAction SilentlyContinue) {
    $useWk = $true
    Write-Host "Using wkhtmltopdf for PDF conversion" -ForegroundColor Green
} else {
    Write-Host "wkhtmltopdf not found - will output HTML files (open in browser and Ctrl+P to save as PDF)" -ForegroundColor Yellow
}

$files = Get-ChildItem -Path $RootPath -Recurse -Include $extensions | Where-Object {
    $skip = $false
    foreach ($folder in $skipFolders) {
        if ($_.FullName -like "*\$folder\*") { $skip = $true; break }
    }
    -not $skip
}

Write-Host ""
Write-Host "Project: $RootPath"
Write-Host "Found $($files.Count) files"
Write-Host ""

$count = 0

foreach ($file in $files) {
    $relPath = $file.FullName.Substring($RootPath.Length).TrimStart("\")
    $safeName = $relPath -replace "\\", "__"
    $htmlPath = Join-Path $OutputDir "$safeName.html"
    $pdfPath  = Join-Path $OutputDir "$safeName.pdf"

    try {
        $code = Get-Content $file.FullName -Raw -Encoding UTF8
    } catch {
        Write-Host "  Could not read: $relPath" -ForegroundColor Yellow
        continue
    }

    $escaped = $code -replace "&", "&amp;" -replace "<", "&lt;" -replace ">", "&gt;"
    $lang = $file.Extension.TrimStart(".").ToUpper()
    $relPathDisplay = $relPath -replace "\\", "/"

    $lines = $escaped -split "`n"
    $codeWithLineNumbers = ""
    $lineNum = 1
    foreach ($line in $lines) {
        $codeWithLineNumbers += "<span class='ln'>$lineNum</span>$line`n"
        $lineNum++
    }

    $html = "<!DOCTYPE html><html><head><meta charset='UTF-8'><style>"
    $html += "* { margin:0; padding:0; box-sizing:border-box; }"
    $html += "body { font-family: Segoe UI, sans-serif; background:#fff; }"
    $html += ".header { background:#1e293b; color:#e2e8f0; padding:10px 16px; display:flex; justify-content:space-between; align-items:center; }"
    $html += ".path { font-family: Consolas, monospace; font-size:12px; color:#93c5fd; }"
    $html += ".lang { font-size:10px; background:#334155; color:#94a3b8; padding:2px 8px; border-radius:4px; }"
    $html += ".wrap { padding:16px; background:#f8fafc; }"
    $html += "pre { font-family: Consolas, monospace; font-size:9px; line-height:1.3; white-space:pre-wrap; word-break:break-all; }"
    $html += ".ln { display:inline-block; width:36px; color:#94a3b8; text-align:right; margin-right:12px; border-right:1px solid #e2e8f0; padding-right:8px; user-select:none; }"
    $html += "@media print { body { -webkit-print-color-adjust:exact; print-color-adjust:exact; } }"
    $html += "</style></head><body>"
    $html += "<div class='header'><span class='path'>$relPathDisplay</span><span class='lang'>$lang</span></div>"
    $html += "<div class='wrap'><pre>$codeWithLineNumbers</pre></div>"
    $html += "</body></html>"

    $html | Out-File -FilePath $htmlPath -Encoding UTF8

    if ($useWk) {
        $wkArgs = @(
            "--page-size", "A4",
            "--margin-top", "5mm",
            "--margin-bottom", "8mm",
            "--margin-left", "5mm",
            "--margin-right", "5mm",
            "--footer-center", "[page]",
            "--footer-font-size", "8",
            "--enable-local-file-access",
            "--quiet",
            $htmlPath,
            $pdfPath
        )
        & wkhtmltopdf @wkArgs 2>$null
        Remove-Item $htmlPath -Force
    }

    $count++
    Write-Host "  OK  $relPath" -ForegroundColor Cyan
}

Write-Host ""
Write-Host "Done! $count files saved to: $OutputDir" -ForegroundColor Green
if (-not $useWk) {
    Write-Host "Open any .html file in your browser and press Ctrl+P -> Save as PDF" -ForegroundColor Gray
}