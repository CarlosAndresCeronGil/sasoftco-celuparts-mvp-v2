import React from 'react'

export default function Home() {
    return (
        <div className={JSON.parse(localStorage.getItem('user')).role === "admin" ? "home-container-admin" : "home-container"}>
            <div className={JSON.parse(localStorage.getItem('user')).role === "admin" ? "home-image-container-admin" : "home-image-container"}>
                <img src='/welcome-image.jpg' alt='some'></img>
            </div>
            <div className='home-title'>
                Bienvenido/a!
            </div>
        </div>
    )
}
