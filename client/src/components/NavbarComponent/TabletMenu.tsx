import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { StyledTablet, StyledTabletInput, StyledTabletTab } from "./style";
import { faBars } from "@fortawesome/free-solid-svg-icons";

interface TabletMenuProps{
    onSearchClick: () =>void
    onBurgerClick: () => void
    tabRef: React.RefObject<HTMLDivElement>
}

export function TabletMenu({ onSearchClick, onBurgerClick, tabRef }: TabletMenuProps) {
    return (
        <StyledTablet>
            <StyledTabletInput>
                <p onClick={onSearchClick}>코인을 검색하세요</p>
            </StyledTabletInput>
            <StyledTabletTab onClick={onBurgerClick} ref={tabRef}>
                <FontAwesomeIcon icon={faBars} size="2xl" />
            </StyledTabletTab>
        </StyledTablet>
    )
}