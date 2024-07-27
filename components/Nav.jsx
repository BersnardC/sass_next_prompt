'use client';
import Image from "next/image"
import Link from "next/link"
import { useState, useEffect } from "react"
import { signIn, signOut, getProviders, useSession } from 'next-auth/react'
const Nav = () => {
    const [providers, setProviders] = useState(null)
    const [toggleDropdown, settoggleDropdown] = useState(true)
    useEffect(() => {
        const setUpProviders = async () => {
            const response = await getProviders();
            setProviders(response);
        }
        setUpProviders();
    }, []);
    const {data: session} = useSession()
  return (
    <nav className="flex-between w-full mb-16 pt-3">
        <Link href="/" className="gap-2 flex-center">
            <Image src="/assets/images/logo.svg" alt="App logo" width={30} height={30} className="object-contain"/>
            <p className="logo_text">Promptopia</p>
        </Link>
        {/* Desktop Navigation */}
        <div className="sm:flex hidden">
            { session?.user ? (
                <div className="flex gap-3 md:gap-5">
                    <Link href="create-prompt" className="black_btn">Create Post</Link>
                    <button type="button" onClick={signOut} className="outline_btn"> Sign Out</button>
                    <Link href="profile">
                        <Image src={session?.user.image ?? '/assets/images/logo.svg'} width={37} height={37} className="rounded-full" alt="Profile Image"></Image>
                    </Link>
                </div>
            ) : (
                <>{
                    providers && Object.values(providers).map(provider => (
                        <button type="button" key={provider.name} onClick={() => signIn(provider.id)} className="black_btn">
                            Sign In
                        </button>
                    ))
                }</>
            )}
        </div>
        {/* {alert(providers)} */}
        {/* Mobile Navigation */}
        <div className="sm:hidden flex relative">
            {
                session?.user ? (
                    <div className="flex">
                        <Image src={session?.user.image ?? '/assets/images/logo.svg'} width={37} height={37} className="rounded-full cursor-pointer" alt="Profile Image"
                        onClick={() => settoggleDropdown(prev => !prev)}></Image>
                        {
                            toggleDropdown && (
                                <div className="dropdown">
                                    <Link
                                        href="/profile"
                                        className="dropdown_link"
                                        onClick={ () => settoggleDropdown(false)}
                                    > My Profile</Link>
                                    <Link
                                        href="/create-prompt"
                                        className="dropdown_link"
                                        onClick={ () => settoggleDropdown(false)}
                                    > Create Prompt</Link>
                                    <button
                                        type="button"
                                        className="mt-5 w-full black_btn"
                                        onClick={() => {
                                            settoggleDropdown(false);
                                            signOut()
                                        }}
                                    > Sign Out</button>
                                </div>
                            )
                        }
                    </div>
                ) : (
                    <>{
                        providers && Object.values(providers).map(provider => (
                            <button type="button" key={provider.name} onClick={() => signIn(provider.id)} className="black_btn">
                                Sign In
                            </button>
                        ))
                    }</>
                )
            }
        </div>
    </nav>
  )
}

export default Nav