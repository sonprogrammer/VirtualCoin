import { Link } from "react-router-dom";
import { StyledDeskInput, StyledDeskMenus } from "./style";


interface DesktopMenuProps{
    menus: {
        name: string;
        path: string
    }[]
    page: string;
    onPageClick: (path: string) => void
    onSearchClick: () => void
}

export function DesktopMenu({ menus, page, onPageClick, onSearchClick }: DesktopMenuProps) {
    return (
        <StyledDeskMenus>
            {menus.map(item => (
                <Link to={item.path} key={item.name} onClick={() => onPageClick(item.path)}
                    style={{ fontWeight: page === item.path ? 'bold' : 'normal' }}>
                    <h3>{item.name}</h3>
                </Link>
            ))}
            <StyledDeskInput>
                <p onClick={onSearchClick}>코인을 검색하세요</p>
            </StyledDeskInput>
        </StyledDeskMenus>
    )
}