// components/ChatSidebar.tsx
import React from "react";
import { Plus, Search, MoreVertical, Settings, Menu, X } from "lucide-react";
import logo from "../../assets/logo/logo.svg";
export default function ChatSidebar({
  sidebarOpen,
  setSidebarOpen,
  searchText,
  setSearchText,
  chats,
  onChatSelect,
}) {
  return (
    <>
      {/* Mobile Menu Button */}
      <button
        onClick={() => setSidebarOpen(!sidebarOpen)}
        className="fixed top-4 left-4 z-50 md:hidden bg-white p-2 rounded-lg shadow-lg border border-stone-200">
        {sidebarOpen ? <X size={24} /> : <Menu size={24} />}
      </button>

      {/* Overlay */}
      {sidebarOpen && (
        <div
          onClick={() => setSidebarOpen(false)}
          className="fixed inset-0 bg-black/50 z-30 md:hidden"
        />
      )}

      {/* Sidebar */}
      <div
        className={`
          w-64 bg-white border-r border-stone-200 flex flex-col
          fixed md:relative inset-y-0 left-0 z-40
          transform transition-transform duration-300 ease-in-out
          ${
            sidebarOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"
          }
        `}>
        {/* Logo */}
        <div className="p-4 ">
          <img src={logo} alt="" />
        </div>

        {/* New Chat */}
        <button className="mx-4 mt-4 border order border-stone-200 cursor-pointer flex items-center gap-2 px-3 py-2 text-sm text-stone-700 bg-white  hover:bg-stone-100 rounded-lg transition">
          <Plus size={18} />
          <span>New chat</span>
        </button>

        {/* Search */}
        <div className="px-4 mt-3 mb-2">
          <div className="relative ">
            <Search
              size={16}
              className="absolute left-3 top-1/2 -translate-y-1/2 text-stone-400"
            />
            <input
              type="text"
              placeholder="Search chats"
              value={searchText}
              onChange={(e) => setSearchText(e.target.value)}
              className="w-full pl-9 pr-3 py-2 text-sm border border-stone-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500"
            />
          </div>
        </div>

        {/* Chats List */}
        <div className="flex-1 mt-2 overflow-y-auto px-2">
          <h2 className="px-3 text-xs font-semibold text-stone-500 uppercase mb-2">
            Chats
          </h2>
          {chats.map((chat) => (
            <div
              key={chat.id}
              onClick={() => onChatSelect?.(chat.id)}
              className={`
                group flex items-center justify-between px-3 py-2 text-sm rounded-lg cursor-pointer transition
                ${
                  chat.active
                    ? "bg-amber-50 text-amber-900 font-medium"
                    : "text-stone-700 hover:bg-stone-100"
                }
              `}>
              <span>{chat.name}</span>
              <MoreVertical
                size={14}
                className="opacity-0 group-hover:opacity-100 text-stone-400"
              />
            </div>
          ))}
        </div>

        {/* Settings */}
        <div className="p-3 border-t border-stone-200">
          <button className="flex items-center gap-2 px-3 py-2 text-sm text-stone-700 hover:bg-stone-100 rounded-lg w-full transition">
            <Settings size={18} />
            <span>Settings</span>
          </button>
        </div>
      </div>
    </>
  );
}
