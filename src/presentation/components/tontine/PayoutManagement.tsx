import React, { useEffect, useState } from 'react';
import { Card, CardContent } from '@/presentation/components/ui/Card';
import { Button } from '@/presentation/components/ui/Button';
import { Badge } from '@/presentation/components/ui/Badge';
import {
  Plus,
  MoreVertical,
  ChevronLeft,
  ChevronRight,
  Loader2,
  AlertCircle
} from 'lucide-react';
import { cn } from '@/presentation/utils/cn';
import { useFinancials } from '@/presentation/hooks/useFinancials';
import { useSearchParams } from 'next/navigation';

interface PayoutManagementProps {
  tontineId: string;
}

export const PayoutManagement = ({ tontineId }: PayoutManagementProps) => {
  const { listPayouts, markPayoutPaid, isLoading, error } = useFinancials();
  const [data, setData] = useState<{ payouts: any[], stats: any } | null>(null);
  const searchParams = useSearchParams();
  const searchQuery = searchParams.get('q')?.toLowerCase() || '';

  const fetchData = async () => {
    const result = await listPayouts(tontineId);
    if (result) setData(result);
  };

  useEffect(() => {
    fetchData();
  }, [tontineId]);

  const handleMarkAsPaid = async (payoutId: string) => {
    if (await markPayoutPaid(tontineId, payoutId)) {
      fetchData(); // Refresh list
    }
  };

  if (isLoading && !data) {
    return (
      <div className="flex flex-col items-center justify-center py-20 gap-md">
        <Loader2 className="animate-spin text-primary" size={40} />
        <p className="text-slate-grey font-medium">Chargement des versements...</p>
      </div>
    );
  }

  const payouts = data?.payouts || [];
  const stats = data?.stats || {};

  const filteredPayouts = payouts.filter((p: any) =>
    (p.user?.name || p.beneficiary?.name || '').toLowerCase().includes(searchQuery) ||
    (p.status || '').toLowerCase().includes(searchQuery)
  );

  return (
    <div className="flex flex-col gap-xl animate-in fade-in slide-in-from-bottom-4 duration-500">
      {/* ... summary cards ... */}

      {/* Table Section */}
      <Card className="bg-white border-slate-light/50 shadow-air overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            {/* ... thead ... */}
            <tbody className="divide-y divide-slate-light/30">
              {filteredPayouts.map((payout: any) => (
                <tr key={payout.id} className="hover:bg-slate-light/5 transition-colors group">
                  {/* ... row content ... */}
                </tr>
              ))}
              {filteredPayouts.length === 0 && (
                <tr>
                  <td colSpan={5} className="px-lg py-xxl text-center text-slate-grey italic">
                    {searchQuery ? `Aucun versement ne correspond à "${searchQuery}"` : "Aucun versement enregistré pour le moment."}
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  );
};
