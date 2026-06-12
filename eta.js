// Renders the maintenance ETA in the visitor's local timezone.
// Leaves the static "soon" text if the timestamp doesn't parse, or has already passed.

const etaElement = document.getElementById('eta')
const eta = new Date(etaElement.dateTime)
const now = new Date()

// An invalid date compares false here too.
if (eta > now) {
    const tomorrow = new Date(now)
    tomorrow.setDate(now.getDate() + 1)

    const timeFormat = new Intl.DateTimeFormat(undefined, {
        hour: 'numeric',
        minute: '2-digit',
        hour12: true,
        timeZoneName: 'short',
    })

    const time = timeFormat.format(eta)
    if (eta.toDateString() === now.toDateString()) {
        etaElement.textContent = `by ${time}`
    } else if (eta.toDateString() === tomorrow.toDateString()) {
        etaElement.textContent = `tomorrow by ${time}`
    } else {
        const dateFormat = new Intl.DateTimeFormat(undefined, {
            weekday: 'long',
            month: 'short',
            day: 'numeric',
        })
        etaElement.textContent = `by ${time} on ${dateFormat.format(eta)}`
    }
    etaElement.classList.add('localized')
}
