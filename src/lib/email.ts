/**
 * Email service for ShiftSimple — sends via Brevo transactional API.
 * Failures throw so they are visible in logs (no silent failures).
 */

type Shift = {
  day: string
  start: string
  end: string
  week: string
}

export async function sendShiftNotification(to: string, staffName: string, shifts: Shift[]) {
  const apiKey = process.env.BREVO_API_KEY

  if (!apiKey) {
    console.warn('BREVO_API_KEY not set — skipping email to', to)
    return
  }

  const week = shifts[0]?.week || ''
  const subject = `Dine vakter for uke ${week}`

  // Build clean HTML body with Norwegian labels
  const rows = shifts
    .map(
      (s) =>
        `<tr><td style="padding:8px 16px 8px 0;text-transform:capitalize">${s.day}</td><td style="padding:8px 0">${s.start} – ${s.end}</td></tr>`
    )
    .join('')

  const htmlBody = `
<!DOCTYPE html>
<html lang="no">
<head><meta charset="utf-8"></head>
<body style="font-family:system-ui,sans-serif;color:#1C2B20;max-width:480px;margin:0 auto;padding:24px">
  <h2 style="color:#4A7C59;margin-bottom:16px">Hei ${staffName}!</h2>
  <p>Her er dine vakter for den kommende uken (uke ${week}):</p>
  <table style="width:100%;border-collapse:collapse;margin:16px 0">
    <thead><tr style="background:#F0F7F4">
      <th style="text-align:left;padding:8px 16px 8px 0;color:#4A7C59">Dag</th>
      <th style="text-align:left;padding:8px 0;color:#4A7C59">Tid</th>
    </tr></thead>
    <tbody>${rows}</tbody>
  </table>
  <p style="margin-top:24px;color:#4A7C59;font-size:14px">Vennlig hilsen,<br>ShiftSimple</p>
</body>
</html>`

  const res = await fetch('https://api.brevo.com/v3/smtp/email', {
    method: 'POST',
    headers: {
      'api-key': apiKey,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      sender: { name: 'ShiftSimple', email: 'hei@shiftsimple.no' },
      to: [{ email: to, name: staffName }],
      subject,
      htmlContent: htmlBody,
    }),
  })

  if (!res.ok) {
    const errBody = await res.text()
    throw new Error(`Brevo API error ${res.status}: ${errBody}`)
  }

  console.log(`Email sent to ${to} (uke ${week})`)
}