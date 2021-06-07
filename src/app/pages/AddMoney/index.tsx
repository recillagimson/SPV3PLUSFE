import * as React from 'react';
import { useHistory } from 'react-router-dom';

import ProtectedContent from 'app/components/Layouts/ProtectedContent';
import Box from 'app/components/Box';
import List from 'app/components/List';
import ListItem from 'app/components/List/ListItem';
import ListItemText from 'app/components/List/ListItemText';

export function AddMoney() {
  const history = useHistory();
  const flags = window['spFlags'];
  console.log(flags);
  return (
    <ProtectedContent>
      <Box title="Web Banking" titleBorder withPadding>
        <List divider>
          <ListItem flex>
            <ListItemText
              role="presentation"
              onClick={
                flags && flags.add_money_dragon_pay_enabled
                  ? () => history.push('/add-money/dragonpay')
                  : undefined
              }
              primary="Dragonpay"
              style={{
                flexGrow: 1,
              }}
              icon
            />
          </ListItem>
          {/* <ListItem flex>
            <ListItemText
              role="presentation"
              onClick={() => alert('Feature coming soon')}
              primary="BPI"
              style={{
                flexGrow: 1,
              }}
              icon
            />
          </ListItem> */}
        </List>
      </Box>
    </ProtectedContent>
  );
}
