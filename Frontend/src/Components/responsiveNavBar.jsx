import React, { useState } from "react";
import {
  Disclosure,
  Menu,
  MenuButton,
  MenuItem,
  MenuItems,
} from "@headlessui/react";

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

function ProfileDropdown() {
  return (
    <Menu as="div" className="relative ml-3">
      <div>
        <MenuButton className="relative flex rounded-full bg-gray-800 text-sm focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800">
          <span className="absolute -inset-1.5" />
          <span className="sr-only">Open user menu</span>
          <img
            className="h-8 w-8 rounded-full"
            src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
            alt=""
          />
        </MenuButton>
      </div>
      <MenuItems
        transition
        className="absolute right-0 z-99 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 transition focus:outline-none data-[closed]:scale-95 data-[closed]:transform data-[closed]:opacity-0 data-[enter]:duration-100 data-[leave]:duration-75 data-[enter]:ease-out data-[leave]:ease-in"
      >
        <MenuItem>
          {({ focus }) => (
            <a
              href="#"
              className={classNames(
                focus ? "bg-gray-100" : "",
                "block px-4 py-2 text-sm text-gray-700"
              )}
            >
              Your Profile
            </a>
          )}
        </MenuItem>
        <MenuItem>
          {({ focus }) => (
            <a
              href="#"
              className={classNames(
                focus ? "bg-gray-100" : "",
                "block px-4 py-2 text-sm text-gray-700"
              )}
            >
              Settings
            </a>
          )}
        </MenuItem>
        <MenuItem>
          {({ focus }) => (
            <a
              href="/"
              className={classNames(
                focus ? "bg-gray-100" : "",
                "block px-4 py-2 text-sm text-gray-700"
              )}
            >
              Sign out
            </a>
          )}
        </MenuItem>
      </MenuItems>
    </Menu>
  );
}

function ResponsiveNavbar() {
  const [activeView, setActiveView] = useState("map"); // 'map' or 'report'

  const handleViewChange = (view) => {
    setActiveView(view);
  };

  const Navigation = () => (
    <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
      {/* Mobile menu button (implementation needed) */}
    </div>
  );

  const Logo = () => (
    <div className="flex flex-shrink-0 items-center">
      <img
        className="h-8 w-auto"
        src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=500"
        alt="Your Company"
      />
    </div>
  );

  const Content = () => {
    return activeView === "map" ? (
      <div>Map Content (implementation needed)</div>
    ) : (
      <div>Report Form and Search Filters (implementation needed)</div>
    );
  };

  return (
    <Disclosure as="nav" className="bg-gray-800">
      {({ open }) => (
        <>
          <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
            <div
              className="relative flex h-16 items-center justify-between"
            >
              <Navigation />
              <Logo />
              <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
                <ProfileDropdown />
              </div>
            </div>
          </div>
          {open && (
            <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
              <div className="relative border-t border-gray-700">
                {/* Navigation links here (implementation needed) */}
              </div>
            </div>
          )}
        </>
      )}
    </Disclosure>
  );
}

export default ResponsiveNavbar;