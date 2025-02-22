import React from 'react'
import Link from 'next/link'
import { motion, AnimatePresence } from 'framer-motion'
import { Button } from '../ui/button'
import { X } from 'lucide-react'
import { useAuth } from '@/context/AuthContext'

const MobileNav = ({ 
  isOpen, 
  setIsOpen, 
  handleLogout 
}: { 
  isOpen: boolean
  setIsOpen: (open: boolean) => void
  handleLogout: () => void
}) => {
  const { isLoggedIn, userLevel } = useAuth()

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[9999] bg-black/50 backdrop-blur-sm"
          onClick={() => setIsOpen(false)}
        >
          <motion.div
            initial={{ y: '100vh%' }}
            animate={{ y: 0 }}
            exit={{ y: '100vh' }}
            transition={{ type: 'spring', bounce: 0.2, duration: 0.4 }}
            className="fixed bottom-0 left-0 right-0 z-[9999] mx-auto max-h-[80vh] rounded-t-2xl bg-white p-6 shadow-lg overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex flex-col items-center gap-4">
              <button 
                onClick={() => setIsOpen(false)}
                className="absolute right-4 top-4"
              >
                <X className="h-6 w-6 text-gray-500" />
              </button>

              <nav className="flex w-full flex-col items-center gap-y-4">
                <Link 
                  href="/kereta-api" 
                  className="w-full py-2 text-center text-lg"
                  onClick={() => setIsOpen(false)}
                >
                  Kereta Api
                </Link>

                {!isLoggedIn ? (
                  <>
                    <Link
                      href="/login"
                      className="w-full py-2 text-center text-lg"
                      onClick={() => setIsOpen(false)}
                    >
                      Masuk
                    </Link>
                    <Button className="w-full text-lg">
                      <Link 
                        href="/daftar"
                        className="w-full"
                        onClick={() => setIsOpen(false)}
                      >
                        Daftar
                      </Link>
                    </Button>
                  </>
                ) : (
                  <>
                    {userLevel && userLevel !== 3 && (
                      <Link
                        href="/admin/dashboard"
                        className="w-full py-2 text-center text-lg"
                        onClick={() => setIsOpen(false)}
                      >
                        Dashboard
                      </Link>
                    )}
                    <Link
                      href="/myaccount/dashboard"
                      className="w-full py-2 text-center text-lg"
                      onClick={() => setIsOpen(false)}
                    >
                      Profil
                    </Link>
                    <Link
                      href="/myaccount/your-orders"
                      className="w-full py-2 text-center text-lg"
                      onClick={() => setIsOpen(false)}
                    >
                      Order Anda
                    </Link>
                    <Link
                      href="/myaccount/settings"
                      className="w-full py-2 text-center text-lg"
                      onClick={() => setIsOpen(false)}
                    >
                      Pengaturan
                    </Link>
                    <button
                      onClick={handleLogout}
                      className="w-full py-2 text-center text-lg text-red-600"
                    >
                      Keluar
                    </button>
                  </>
                )}
              </nav>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

export default MobileNav