import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import Profile from './Profile'
import UpdateProfile from './UpdateProfile'
import UpdatePassword from './UpdatePassword'

function Account() {
  const [selectedComponent , setSelectedComponent] = useState("Profile")
  return (
    <main className='flex min-h-[calc(100vh_-_theme(spacing.16))] flex-1 flex-col gap-4 bg-muted/40 p-4 md:gap-4'>
       <div className='mx-auto grid w-full max-w-6xl gap-2'>
        <h1 className='text-2xl font-semibold'>Settings</h1>
       </div>
       <div className='mx-auto grid w-full max-w-6xl items-start gap-6 md:grid-cols-[180px_1fr] lg:grid-cols-[200px_1fr]' >
        <nav className='grid gap-4 text-sm text-muted-foreground'>
          <Link href="#" className={selectedComponent === "Profile"?"font-semibold text-primary":""} onClick={()=>{setSelectedComponent("Profile")}}>
           Profile
          </Link>
           <Link href="#" className={selectedComponent=== "Update Profile"?"font-semibold text-primary":""} onClick={()=>{setSelectedComponent("Update Profile")}}>
           Update Profile
          </Link>
           <Link href="#" className={selectedComponent=== "Update Password"?"font-semibold text-primary":""} onClick={()=>{setSelectedComponent("Update Password")}}>
           Update Password
          </Link>
         
        </nav>
        <div>
          {
      (()=>{
        switch (selectedComponent) {
          case "Profile":
            return <Profile/>
          case "Update Profile":
            return <UpdateProfile/>
          case "Update Password":
            return <UpdatePassword/>
          default:
            return null; 
        }
      })()
     }
        </div>
       </div>
    </main>
  )
}

export default Account