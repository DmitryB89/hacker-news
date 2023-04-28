import logo from '../assets/hacker_logo.png'

export const Navbar = () => {
  return (
    <nav className={'navWrapper'}>
      <div className={'navContent'}>
        <img src={logo} alt="hacker_logo" className={'logo'} />
      </div>
    </nav>
  )
}
