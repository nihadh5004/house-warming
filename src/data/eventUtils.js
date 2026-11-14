export function getRemaining(target, now = Date.now()) {
  const distance = new Date(target).getTime() - now;
  if (!Number.isFinite(distance) || distance <= 0) return null;
  return { days: Math.floor(distance / 86400000), hours: Math.floor((distance / 3600000) % 24), minutes: Math.floor((distance / 60000) % 60), seconds: Math.floor((distance / 1000) % 60) };
}

export function createShareMessage(invitation, pageUrl) {
  return ["Assalamu Alaikum,", "", `You are warmly invited to the housewarming of ${invitation.venueName}!`, `Hosted by ${invitation.hosts.join(" & ")}`, "", `Date: ${invitation.displayDate}`, `Reception: ${invitation.displayTime} IST`, `Location: ${invitation.address}`, `Directions: ${invitation.mapsUrl}`, "", "Join us as we begin this beautiful new chapter.", "View the invitation:", invitation.websiteUrl || pageUrl].join("\n");
}
