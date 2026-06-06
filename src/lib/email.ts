/**
 * Simple email service for ShiftSimple.
 * In production, this would use Resend, SendGrid, or AWS SES.
 */

export async function sendShiftNotification(to: string, staffName: string, shifts: any[]) {
  const shiftDetails = shifts.map(s => `${s.day}: ${s.start} - ${s.end}`).join('\n')
  
  console.log(`
    SIMULATED EMAIL SENT:
    To: ${to}
    Subject: Dine vakter for uke ${shifts[0]?.week || ''}
    Body:
    Hei ${staffName}!
    Her er dine vakter for den kommende uken:
    ${shiftDetails}
    
    Vennlig hilsen,
    ShiftSimple
  `)
  
  // Real implementation:
  /*
  await fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${process.env.RESEND_API_KEY}`,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      from: 'vakt@shiftsimple.no',
      to,
      subject: `Dine vakter for uke ${shifts[0]?.week}`,
      text: `Hei ${staffName}!\n\nHer er dine vakter:\n${shiftDetails}`
    })
  })
  */
}
