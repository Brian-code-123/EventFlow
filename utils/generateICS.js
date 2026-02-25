/**
 * Generate ICS (iCalendar) file content for an event
 * @param {Object} event - Event data
 * @param {string} event.title - Event title
 * @param {string} event.description - Event description
 * @param {string} event.startDate - Event start date (ISO string)
 * @param {string} event.endDate - Event end date (ISO string)
 * @param {string} event.location - Event location
 * @param {string} [event.registrationDeadline] - Registration deadline (ISO string)
 * @returns {string} ICS file content
 */
export function generateICS(event) {
  const { title, description, startDate, endDate, location, registrationDeadline } = event;

  // Format date to ICS format (YYYYMMDDTHHMMSSZ)
  const formatDate = (date) => {
    if (!date) return '';
    const d = new Date(date);
    return d.toISOString().replace(/[-:]/g, '').split('.')[0] + 'Z';
  };

  // Create unique identifier
  const uid = () => {
    return 'eventflow-' + Math.random().toString(36).substring(2) + '@eventflow.app';
  };

  // Escape special characters for ICS format
  const escapeText = (text) => {
    if (!text) return '';
    return text
      .replace(/\\/g, '\\\\')
      .replace(/;/g, '\\;')
      .replace(/,/g, '\\,')
      .replace(/\n/g, '\\n');
  };

  // Build ICS content
  let icsContent = [
    'BEGIN:VCALENDAR',
    'VERSION:2.0',
    'PRODID:-//EventFlow//Hackathon Platform//EN',
    'CALSCALE:GREGORIAN',
    'METHOD:PUBLISH',
    'BEGIN:VEVENT',
    `UID:${uid()}`,
    `DTSTAMP:${formatDate(new Date())}`,
    `DTSTART:${formatDate(startDate)}`,
    `DTEND:${formatDate(endDate)}`,
    `SUMMARY:${escapeText(title)}`,
    `DESCRIPTION:${escapeText(description || '')}`,
    `LOCATION:${escapeText(location || 'Virtual')}`,
    'STATUS:CONFIRMED',
    'SEQUENCE:0',
  ];

  // Add registration deadline as alarm
  if (registrationDeadline) {
    icsContent.push(
      'BEGIN:VALARM',
      'TRIGGER:-P1D',
      'ACTION:DISPLAY',
      `DESCRIPTION:Reminder: Registration deadline for ${escapeText(title)}`,
      'END:VALARM'
    );
  }

  // Add event reminder (1 hour before)
  icsContent.push(
    'BEGIN:VALARM',
    'TRIGGER:-PT1H',
    'ACTION:DISPLAY',
    `DESCRIPTION:Starting soon: ${escapeText(title)}`,
    'END:VALARM'
  );

  icsContent.push('END:VEVENT', 'END:VCALENDAR');

  return icsContent.join('\r\n');
}

/**
 * Trigger download of ICS file
 * @param {Object} event - Event data
 * @param {string} filename - Optional filename (without extension)
 */
export function downloadICS(event, filename) {
  const icsContent = generateICS(event);
  const blob = new Blob([icsContent], { type: 'text/calendar;charset=utf-8' });
  const url = URL.createObjectURL(blob);
  
  const link = document.createElement('a');
  link.href = url;
  link.download = `${filename || 'event'}.ics`;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  
  // Clean up
  URL.revokeObjectURL(url);
}
