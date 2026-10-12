const BASE = import.meta.env.VITE_API_URL || ''

export async function postForm(path, data) {
  let res
  try {
    res = await fetch(`${BASE}/api/${path}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    })
  } catch {
    throw { message: 'Network error. Please check your connection and try again.' }
  }
  const body = await res.json().catch(() => ({}))
  if (!res.ok || !body.ok) {
    throw { message: body.error || 'Something went wrong. Please try again.', errors: body.errors }
  }
  return body
}
