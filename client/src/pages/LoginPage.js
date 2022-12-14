import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import { Link, useHistory } from 'react-router-dom'

const LoginPage = () => {
  const [error, setError] = useState('')
  const { handleSubmit, register, reset } = useForm()
  const history = useHistory()
  const [shown, setShown] = useState(false)
  const [password, setPassword] = useState('')

  const onChange = ({ currentTarget }) => setPassword(currentTarget.value);
  const switchShown = (e) => {
    e.preventDefault()
    setShown(!shown)
  }

  const onSubmit = async (values) => {
    setError('') // Resetting submit errors
    if (!values.email || !values.password) {
      setError('Please fill in all fields')
      return
    }
    const response = await fetch(process.env.REACT_APP_BACKEND_API + '/auth/login', {
      method: 'POST',
      body: JSON.stringify(values),
      headers: {
        'Content-Type': 'application/json'
      }
    })
    const body = await response.json()
    if (!response.ok) {
      setError(body.message)
    } else {
      reset()
      window.localStorage.setItem('token', body.token)
      window.localStorage.setItem('user', JSON.stringify(body.user))
      history.push('/todo')
    }
  }

  return <>
    <section className="py-20" style={{
      backgroundImage: 'url(https://res.cloudinary.com/print-bear/image/fetch/c_fill,f_auto,fl_lossy,q_auto:best/https://images.ctfassets.net/rw1l6cgr235r/4hEMrzk55KaEWAIEeAocEm/725d3fa4580fdb5d16c3ae8ed8bf72a2/logo-stickers-thumbnail-4651.jpg)',
      backgroundSize: 'cover',
    }}>
      <div className="container mx-auto max-w-screen-lg">
        <div className="py-1 grid grid-cols-8">
          <div className="col-span-3">
            <form className="bg-gray-100 rounded p-6" onSubmit={handleSubmit(onSubmit)}>
              <h2 className="text-2xl mb-8 text-center text-opacity-75 font-bold">Welcome</h2>
              {error
                ? <span className="inline-block w-full px-3 py-2 rounded bg-red-500 text-white mb-4">
                  {error}
                </span>
                : null}
              <div className="flex flex-col mb-4">
                <label className="font-semibold mb-1">Email Address</label>
                <input ref={register} className="py-2 px-4 bg-white rounded border-2 border-gray-600" type="text" name="email" placeholder="Email Address" />
              </div>
              <div className="flex flex-col mb-6">
                <label className="font-semibold mb-1">Password</label>
                <input ref={register} className="py-2 px-4 bg-white rounded border-2 border-gray-600" type={shown ? 'text' : 'password'} onChange={onChange} name="password" placeholder="" value={password} minLength={6} />
              </div>
              <div className="flex">
                <button type='submit' className="px-2 py-4 inline-flex text-white rounded w-full justify-center bg-purple-600">
                  Login
                </button>
              </div>
              <div className="flex">
                <button className="inline-flex bg-gray-600 py-2 my-1 rounded justify-center text-white" onClick={switchShown}>
                  {shown ? 'Ocultar' : 'Mostrar'}
                </button>
              </div>
              <div className="flex justify-center mt-4">
                <Link to="/signup" className="text-black-600">Don't have an account? <span className='text-purple-600'>Sign up</span></Link>
              </div>
            </form>
          </div>
          <div className="col-span-5"></div>
        </div>
      </div>
    </section>
  </>
}

export default LoginPage