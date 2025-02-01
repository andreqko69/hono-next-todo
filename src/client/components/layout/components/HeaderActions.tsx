import { Bell, Calendar } from 'lucide-react';
import React from 'react';

import { Button } from '@/client/components/ui/button';

const HeaderActions = () => {
  return (
    <div className="flex items-center gap-2">
      <Button size="icon" title="Notifications">
        <Bell />
      </Button>
      <Button size="icon" title="Notifications">
        <Calendar />
      </Button>
    </div>
  );
};

export default HeaderActions;
