import { useState } from 'react'
import * as allauth from './lib/allauth'
import { Navigate, useLoaderData } from 'react-router-dom'
import FormErrors from './FormErrors'

export default function DeactivateTOTP (props) {
  const [response, setResponse] = useState({ fetching: false, data: null })

  function submit () {
    setResponse({ ...response, fetching: true })
    allauth.deactivateTOTPAuthenticator().then((data) => {
      setResponse((r) => { return { ...r, data } })
    }).catch((e) => {
      console.error(e)
      window.alert(e)
    }).then(() => {
      setResponse((r) => { return { ...r, fetching: false } })
    })
  }
  if (response.data?.status === 200) {
    return <Navigate to='/account/2fa' />
  }
  return (
    <section>
      <h1>Deactivate Authenticator App</h1>

      <p>You are about to deactivate authenticator app based authentication. Are you sure?</p>

      <button onClick={() => submit()}>Deactivate</button>
    </section>
  )
}