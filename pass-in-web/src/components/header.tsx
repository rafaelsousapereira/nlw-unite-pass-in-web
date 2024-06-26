import nlwUnitIcon from "../assets/nlw-unite-icon.svg"
import { NavLink } from "./nav-link"

export const Header = () => {
  return (
    <div className="flex items-center gap-5 py-2">
      <img src={nlwUnitIcon} alt="Ícone NLW Unite" />

      <nav className="flex items-center gap-5">
        <NavLink href="/eventos">Eventos</NavLink>
        <NavLink href="/participantes">Participantes</NavLink>
      </nav>
    </div>
  )
}