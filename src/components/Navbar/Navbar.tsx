import logo from '../../assets/hacker_logo.png'
import s from '../Navbar/Navbar.module.scss'
export const Navbar = () => {
  return (
    <nav className={s.navWrapper}>
      <div>
        <img src={logo} alt="hacker_logo" className={s.logo} />
      </div>
    </nav>
  )
}
