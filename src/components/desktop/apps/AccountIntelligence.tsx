'use client'

import { useState } from 'react'
import { Building2, CheckCircle2, AlertCircle, XCircle, TrendingUp, Users, DollarSign } from 'lucide-react'
import * as Sentry from '@sentry/nextjs'

interface Account {
  id: string
  name: string
  industry: string
  arr: number
  owner: string
  sentryStatus: 'active' | 'partial' | 'none' | 'trial'
  projectCount: number
  errorVolume: number
  lastActive?: string
}

const mockAccounts: Account[] = [
  {
    id: 'acc-001',
    name: 'Acme Corporation',
    industry: 'Technology',
    arr: 250000,
    owner: 'Sarah Chen',
    sentryStatus: 'active',
    projectCount: 12,
    errorVolume: 1250,
    lastActive: '2 hours ago'
  },
  {
    id: 'acc-002',
    name: 'GlobalTech Industries',
    industry: 'Manufacturing',
    arr: 180000,
    owner: 'Mike Johnson',
    sentryStatus: 'partial',
    projectCount: 3,
    errorVolume: 450,
    lastActive: '1 day ago'
  },
  {
    id: 'acc-003',
    name: 'StartupXYZ',
    industry: 'Fintech',
    arr: 50000,
    owner: 'Sarah Chen',
    sentryStatus: 'trial',
    projectCount: 1,
    errorVolume: 89,
    lastActive: '3 hours ago'
  },
  {
    id: 'acc-004',
    name: 'Enterprise Solutions Inc',
    industry: 'Enterprise Software',
    arr: 500000,
    owner: 'David Park',
    sentryStatus: 'none',
    projectCount: 0,
    errorVolume: 0,
    lastActive: undefined
  },
  {
    id: 'acc-005',
    name: 'MegaCorp International',
    industry: 'Retail',
    arr: 320000,
    owner: 'Mike Johnson',
    sentryStatus: 'active',
    projectCount: 8,
    errorVolume: 2100,
    lastActive: '30 minutes ago'
  },
  {
    id: 'acc-006',
    name: 'InnovateCo',
    industry: 'Healthcare',
    arr: 150000,
    owner: 'Sarah Chen',
    sentryStatus: 'none',
    projectCount: 0,
    errorVolume: 0,
    lastActive: undefined
  },
  {
    id: 'acc-007',
    name: 'TechVentures LLC',
    industry: 'Technology',
    arr: 95000,
    owner: 'David Park',
    sentryStatus: 'partial',
    projectCount: 2,
    errorVolume: 156,
    lastActive: '5 days ago'
  },
  {
    id: 'acc-008',
    name: 'DataFlow Systems',
    industry: 'Data Analytics',
    arr: 280000,
    owner: 'Mike Johnson',
    sentryStatus: 'active',
    projectCount: 15,
    errorVolume: 3400,
    lastActive: '1 hour ago'
  }
]

export function AccountIntelligence() {
  const [selectedStatus, setSelectedStatus] = useState<string>('all')
  const [searchQuery, setSearchQuery] = useState('')

  const filteredAccounts = mockAccounts.filter(account => {
    const matchesStatus = selectedStatus === 'all' || account.sentryStatus === selectedStatus
    const matchesSearch = account.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         account.industry.toLowerCase().includes(searchQuery.toLowerCase())
    return matchesStatus && matchesSearch
  })

  const stats = {
    totalARR: mockAccounts.reduce((sum, acc) => sum + acc.arr, 0),
    activeAccounts: mockAccounts.filter(acc => acc.sentryStatus === 'active').length,
    whitespaceAccounts: mockAccounts.filter(acc => acc.sentryStatus === 'none').length,
    totalProjects: mockAccounts.reduce((sum, acc) => sum + acc.projectCount, 0)
  }

  const getStatusBadge = (status: Account['sentryStatus']) => {
    switch (status) {
      case 'active':
        return (
          <div className="flex items-center gap-1 px-2 py-1 bg-green-500/20 text-green-400 rounded text-xs">
            <CheckCircle2 className="w-3 h-3" />
            Active
          </div>
        )
      case 'partial':
        return (
          <div className="flex items-center gap-1 px-2 py-1 bg-yellow-500/20 text-yellow-400 rounded text-xs">
            <AlertCircle className="w-3 h-3" />
            Partial
          </div>
        )
      case 'trial':
        return (
          <div className="flex items-center gap-1 px-2 py-1 bg-blue-500/20 text-blue-400 rounded text-xs">
            <TrendingUp className="w-3 h-3" />
            Trial
          </div>
        )
      case 'none':
        return (
          <div className="flex items-center gap-1 px-2 py-1 bg-red-500/20 text-red-400 rounded text-xs">
            <XCircle className="w-3 h-3" />
            No Sentry
          </div>
        )
    }
  }

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount)
  }

  const handleAccountClick = (account: Account) => {
    Sentry.logger.info('Account viewed', { accountId: account.id, accountName: account.name })
    Sentry.metrics.count('account_intelligence.account.viewed', 1, {
      attributes: { status: account.sentryStatus }
    })
  }

  return (
    <div className="h-full flex flex-col bg-[#0f0c14] text-white font-mono">
      {/* Header with Stats */}
      <div className="p-4 border-b border-[#2a2535]">
        <div className="flex items-center gap-2 mb-4">
          <Building2 className="w-5 h-5 text-[#7553ff]" />
          <h2 className="text-lg font-bold">Account Intelligence</h2>
        </div>

        <div className="grid grid-cols-4 gap-3 mb-4">
          <div className="bg-[#1a1625] p-3 rounded border border-[#2a2535]">
            <div className="flex items-center gap-2 text-xs text-gray-400 mb-1">
              <DollarSign className="w-3 h-3" />
              Total ARR
            </div>
            <div className="text-lg font-bold text-[#7553ff]">{formatCurrency(stats.totalARR)}</div>
          </div>
          <div className="bg-[#1a1625] p-3 rounded border border-[#2a2535]">
            <div className="flex items-center gap-2 text-xs text-gray-400 mb-1">
              <CheckCircle2 className="w-3 h-3" />
              Active
            </div>
            <div className="text-lg font-bold text-green-400">{stats.activeAccounts}</div>
          </div>
          <div className="bg-[#1a1625] p-3 rounded border border-[#2a2535]">
            <div className="flex items-center gap-2 text-xs text-gray-400 mb-1">
              <XCircle className="w-3 h-3" />
              Whitespace
            </div>
            <div className="text-lg font-bold text-red-400">{stats.whitespaceAccounts}</div>
          </div>
          <div className="bg-[#1a1625] p-3 rounded border border-[#2a2535]">
            <div className="flex items-center gap-2 text-xs text-gray-400 mb-1">
              <Users className="w-3 h-3" />
              Projects
            </div>
            <div className="text-lg font-bold text-[#ff45a8]">{stats.totalProjects}</div>
          </div>
        </div>

        {/* Filters */}
        <div className="flex gap-2">
          <input
            type="text"
            placeholder="Search accounts..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="flex-1 px-3 py-2 bg-[#1a1625] border border-[#2a2535] rounded text-sm focus:outline-none focus:border-[#7553ff]"
          />
          <select
            value={selectedStatus}
            onChange={(e) => setSelectedStatus(e.target.value)}
            className="px-3 py-2 bg-[#1a1625] border border-[#2a2535] rounded text-sm focus:outline-none focus:border-[#7553ff]"
          >
            <option value="all">All Status</option>
            <option value="active">Active</option>
            <option value="partial">Partial</option>
            <option value="trial">Trial</option>
            <option value="none">No Sentry (Whitespace)</option>
          </select>
        </div>
      </div>

      {/* Account List */}
      <div className="flex-1 overflow-y-auto">
        <div className="p-4 space-y-2">
          {filteredAccounts.map((account) => (
            <div
              key={account.id}
              onClick={() => handleAccountClick(account)}
              className="bg-[#1a1625] border border-[#2a2535] rounded p-3 hover:border-[#7553ff] transition-colors cursor-pointer"
            >
              <div className="flex items-start justify-between mb-2">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <h3 className="font-bold text-white">{account.name}</h3>
                    {getStatusBadge(account.sentryStatus)}
                  </div>
                  <div className="text-xs text-gray-400">
                    {account.industry} • {account.owner} • {formatCurrency(account.arr)} ARR
                  </div>
                </div>
              </div>

              {account.sentryStatus !== 'none' && (
                <div className="flex gap-4 text-xs mt-2 pt-2 border-t border-[#2a2535]">
                  <div>
                    <span className="text-gray-400">Projects:</span>{' '}
                    <span className="text-[#7553ff] font-bold">{account.projectCount}</span>
                  </div>
                  <div>
                    <span className="text-gray-400">Errors (7d):</span>{' '}
                    <span className="text-[#ff45a8] font-bold">{account.errorVolume.toLocaleString()}</span>
                  </div>
                  {account.lastActive && (
                    <div>
                      <span className="text-gray-400">Last Active:</span>{' '}
                      <span className="text-green-400">{account.lastActive}</span>
                    </div>
                  )}
                </div>
              )}

              {account.sentryStatus === 'none' && (
                <div className="mt-2 pt-2 border-t border-[#2a2535]">
                  <div className="text-xs text-red-400 font-bold">
                    🎯 Whitespace Opportunity - {formatCurrency(account.arr)} ARR
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
