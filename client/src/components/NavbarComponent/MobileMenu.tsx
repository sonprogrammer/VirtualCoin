import { Link } from "react-router-dom";
import { StyledMobileMenu } from "./style";


interface MobileMenuProps{
    menus: {
        name: string;
        path: string;
    }[];
    page: string;
    onPageClick: (path: string) => void;
}


export function MobileMenu({menus, page, onPageClick}: MobileMenuProps) {
    return (
        <StyledMobileMenu>
            {menus.map(item => (
                <Link to={item.path} key={item.name} onClick={() => onPageClick(item.path)}
                    style={{
                        fontWeight: page === item.path ? 'bold' : 'normal',
                        color: page === item.path ? '#ffffff' : '#71717a'
                    }}
                >
                    <p>{item.name}</p>
                </Link>
            ))}
        </StyledMobileMenu>
    )
}