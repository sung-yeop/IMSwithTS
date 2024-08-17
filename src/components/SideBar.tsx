import React, { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import "../scss/Sidebar.scss";
import { useLocation } from "react-router-dom";

interface MenuItem {
  title: string;
  url: string;
  toggle?: boolean;
  drop?: MenuItem[]; // 선택적으로 포함될 수 있는 드롭다운 메뉴
}

const mockData: MenuItem[] = [
  {
    title: "Home",
    url: "/",
  },
  {
    title: "ItemManage",
    url: "/ItemManage",
    toggle: true,
    drop: [
      { title: "Add", url: "/ItemManage/Add" },
      {
        title: "Update",
        url: "/ItemManage/Update",
      },
      {
        title: "Delete",
        url: "/ItemManage/Delete",
      },
    ],
  },
  {
    title: "OrderItemManage",
    url: "/OrderItemManage",
    toggle: true,
    drop: [
      {
        title: "OrderItem",
        url: "/OrderItemManage/OrderItem",
      },
      {
        title: "OrderProcess",
        url: "/OrderItemManage/OrderProcess",
      },
    ],
  },
];

const Sidebar = () => {
  const [openMenuIndex, setOpenMenuIndex] = useState<number | null>(null);
  const path = useLocation();

  const toggleDropdown = (index: number) => {
    setOpenMenuIndex(openMenuIndex === index ? null : index);
  };

  return (
    <div className="SideBar">
      {mockData.map((menu: MenuItem, index: number) => {
        const isMatchUrl = path.pathname.includes(menu.url);
        const isOpen = openMenuIndex === index;
        return (
          <div className="SideBar-Main" key={index}>
            <NavLink
              key={index + `${menu.url}`}
              to={menu.toggle ? "#" : menu.url}
              className={({ isActive }) => {
                return isActive && isMatchUrl ? "active" : "";
              }}
              onClick={() => menu.toggle && toggleDropdown(index)}
            >
              {menu.title}
            </NavLink>
            {menu.drop
              ? menu.drop.map((drop: MenuItem, index: number) => {
                  return (
                    <div
                      className="SideBar-Drop"
                      key={index + 100}
                      style={{
                        maxHeight: isOpen ? "500px" : "0",
                        overflow: "hidden",
                        transition: "max-height 0.3s ease",
                      }}
                    >
                      <NavLink
                        key={index + `${drop.url}`}
                        to={drop.url}
                        className={({ isActive }) => {
                          return isActive ? "active" : "";
                        }}
                      >
                        {drop.title}
                      </NavLink>
                    </div>
                  );
                })
              : null}
          </div>
        );
      })}
    </div>
  );
};

export default Sidebar;
