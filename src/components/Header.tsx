import { Link, useMatch } from "react-router-dom";
import styled from "styled-components";
import {
  motion,
  useAnimation,
  useScroll,
  useMotionValueEvent,
} from "framer-motion";
import { useState } from "react";

const Nav = styled(motion.nav)`
  display: flex;
  justify-content: center;
  align-items: center;
  position: fixed;
  width: 100%;
  top: 0;
  background-color: black;
  font-size: 14px;
  padding: 20px 60px;
  color: white;
  z-index: 100;
`;

const Col = styled.div`
  display: flex;
  align-items: center;
`;

const Items = styled.ul`
  display: flex;
  align-items: center;
  font-size: 20px;
`;

const Item = styled.li`
  margin-right: 20px;
  color: white;
  transition: color 0.3s ease-in-out;
  position: relative;
  display: flex;
  justify-content: center;
  flex-direction: column;
`;
const LinkText = styled.div`
  &:hover,
  &.active {
    color: red;
  }
`;
const Circle = styled(motion.span)`
  position: absolute;
  width: 5px;
  height: 5px;
  border-radius: 5px;
  bottom: -5px;
  left: 0;
  right: 0;
  margin: 0 auto;
  background-color: red;
`;
const navVariants = {
  top: {
    backgroundColor: "rgba(0, 0, 0, 0)",
  },
  scroll: {
    backgroundColor: "rgba(0, 0, 0, 1)",
  },
};

function Header() {
  const [isActive, setIsActive] = useState(false);
  const popularMatch = useMatch("/");
  const nowPlayingMatch = useMatch("/now-playing");
  const comingSoonMatch = useMatch("/coming-soon");
  const navAnimation = useAnimation();
  const { scrollYProgress } = useScroll();

  useMotionValueEvent(scrollYProgress, "change", (y) => {
    if (y < 0.1) navAnimation.start("top");
    else navAnimation.start("scroll");
  });

  return (
    <Nav variants={navVariants} animate={navAnimation} initial={"top"}>
      <Col>
        <Items>
          <Item>
            <Link to="/" style={{ color: popularMatch ? "red" : "white" }}>
              Popular {popularMatch && <Circle layoutId="circle" />}
            </Link>
          </Item>
          <Item>
            <Link
              to="now-playing"
              style={{ color: nowPlayingMatch ? "red" : "white" }}
            >
              Now Playing {nowPlayingMatch && <Circle layoutId="circle" />}
            </Link>
          </Item>
          <Item>
            <Link
              to="coming-soon"
              style={{ color: comingSoonMatch ? "red" : "white" }}
            >
              Comming soon {comingSoonMatch && <Circle layoutId="circle" />}
            </Link>
          </Item>
        </Items>
      </Col>
    </Nav>
  );
}

export default Header;
