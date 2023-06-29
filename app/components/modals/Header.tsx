'use client'

interface HeaderProps {
    title: string;
    subtitle: string;
    center?: boolean
}
const Header:React.FC<HeaderProps> = ({
    title,
    subtitle,
    center
}) =>{
    return (
        <div className={`${center ? 'text-center':'text-start'}`}>
            <h1 className="text-bold ">
                {title}
            </h1>
            <p className="text-neutral-400 text-semibold">{subtitle}</p>
        </div>
    )
}

export default Header