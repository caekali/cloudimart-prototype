import React from 'react'

export default function Footer() {
  return (
    <footer className="mt-auto border-t border-gray-200 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 py-10">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-sm text-gray-600">
          
          <div className="flex flex-col gap-2">
            <span className="text-base font-semibold text-gray-900">
              Cloudimart
            </span>
            <p className="max-w-xs">
              Buy and sell with confidence. Fast delivery and secure payments.
            </p>
            <div className="flex items-center gap-2 text-orange-600">
              <span>🚚</span>
              <span>Fast local delivery</span>
            </div>
          </div>

          <div className="flex flex-col gap-2">
            <span className="font-medium text-gray-900">Support</span>
            <a href="#" className="hover:text-orange-600">Help Center</a>
            <a href="#" className="hover:text-orange-600">Track Order</a>
            <a href="#" className="hover:text-orange-600">Contact Us</a>
            <a href="#" className="hover:text-orange-600">Sell on Cloudimart</a>
          </div>

          <div className="flex flex-col gap-2">
            <span className="font-medium text-gray-900">Legal</span>
            <a href="#" className="hover:text-orange-600">Terms & Conditions</a>
            <a href="#" className="hover:text-orange-600">Privacy Policy</a>
            <a href="#" className="hover:text-orange-600">Refund Policy</a>
          </div>
        </div>

        <div className="mt-8 pt-6 border-t border-gray-200 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-gray-500">
          <span>
            © {new Date().getFullYear()} Cloudimart. All rights reserved.
          </span>
        </div>
      </div>
    </footer>
  )
}

