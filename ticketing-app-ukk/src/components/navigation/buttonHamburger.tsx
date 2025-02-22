import React from 'react'
import { Button } from '../ui/button'
import { Menu } from 'lucide-react'

const HamburgerNav = ({
  setIsOpen
}: {
  setIsOpen: (open: boolean) => void
}) => {
  return (
    <Button
      variant="ghost"
      size="icon"
      onClick={() => setIsOpen(true)}
      className="lg:hidden"
    >
      <Menu className="h-6 w-6" />
    </Button>
  )
}

export default HamburgerNav