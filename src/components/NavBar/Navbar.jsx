import React from 'react'
import { NavLink } from 'react-router-dom';
import {
    Home, BookOpen, PiggyBank, MessageSquare, Users, User,
    TrendingUp, ArrowUpRight, ArrowDownRight, Bell,
    CreditCard, DollarSign, Send, Lightbulb, Newspaper
  } from 'lucide-react';
function Navbar() {
  return (
    <nav className="bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex items-center">
              <CreditCard className="h-8 w-8 text-blue-600" />
              <span className="ml-2 text-xl font-medium">KUNJI</span>
            </div>
                  <div className="flex items-center space-x-8">
                  <NavLink
                        to='/'
                        className={({isActive}) =>
                            `block py-2 pr-4 pl-3 duration-200 border-b ${isActive?'text-orange-700':'text-gray-700'} border-gray-100 hover:bg-gray-50 lg:hover:bg-transparent lg:border-0 hover:text-orange-700 lg:p-0`
                        }
                    >
                            Home                
                    </NavLink>
              
                    <NavLink
                        to='/courses'
                        className={({isActive}) =>
                            `block py-2 pr-4 pl-3 duration-200 border-b ${isActive?'text-orange-700':'text-gray-700'} border-gray-100 hover:bg-gray-50 lg:hover:bg-transparent lg:border-0 hover:text-orange-700 lg:p-0`
                        }
                    >
                            Courses                
                    </NavLink>
                    <NavLink
                        to='/budget'
                        className={({isActive}) =>
                            `block py-2 pr-4 pl-3 duration-200 border-b ${isActive?'text-orange-700':'text-gray-700'} border-gray-100 hover:bg-gray-50 lg:hover:bg-transparent lg:border-0 hover:text-orange-700 lg:p-0`
                        }
                    >
                            Budget                
                    </NavLink>
                    <NavLink
                        to='/article'
                        className={({isActive}) =>
                            `block py-2 pr-4 pl-3 duration-200 border-b ${isActive?'text-orange-700':'text-gray-700'} border-gray-100 hover:bg-gray-50 lg:hover:bg-transparent lg:border-0 hover:text-orange-700 lg:p-0`
                        }
                    >
                            Articles                
                    </NavLink>
              <Users className="h-5 w-5 text-gray-400" />
              <NavLink
                        to='/sign'
                        className={({isActive}) =>
                            `block py-2 pr-4 pl-3 duration-200 border-b ${isActive?'text-orange-700':'text-gray-700'} border-gray-100 hover:bg-gray-50 lg:hover:bg-transparent lg:border-0 hover:text-orange-700 lg:p-0`
                        }
                    >
                            Logout              
                    </NavLink>
              <Bell className="h-5 w-5 text-gray-400" />
            </div>
          </div>
        </div>
      </nav>
  )
}

export default Navbar