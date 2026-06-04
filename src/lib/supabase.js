const SCRIPT_URL = 'https://script.google.com/macros/s/AKfycbyIvqspmXp_dwxvoBe9vXOhjkxK7e7zyFOVnomgOBcA0cSdcHTdn2rSDC65lIFh5Q/exec'

export async function submitLead(data) {
  const formData = new FormData()
  Object.entries(data).forEach(([key, value]) => {
    formData.append(key, value || '')
  })
  const res = await fetch(SCRIPT_URL, {
    method: 'POST',
    body: formData,
  })
  if (!res.ok) throw new Error('Failed')
  return true
}
