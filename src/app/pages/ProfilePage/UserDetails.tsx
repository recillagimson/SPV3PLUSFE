/**
 * User Info List
 *
 */
import * as React from 'react';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import List from 'app/components/List';
import ListItem from 'app/components/List/ListItem';
import ListItemText from 'app/components/List/ListItemText';
import IconButton from 'app/components/Elements/IconButton';

export default function UserDetailsList({ profile, refs }) {
  let country = '-';
  let nationality = '-';
  let natureOfWork = '-';
  let sourceOfFunds = '-';
  if (profile && refs && Object.keys(refs).length > 0) {
    country = refs.countries.findIndex(j => j.id === profile.country_id);
    nationality = refs.nationalities.findIndex(
      j => j.id === profile.nationality_id,
    );
    natureOfWork =
      profile.encoded_nature_of_work !== ''
        ? profile.encoded_nature_of_work
        : refs.natureOfWork.findIndex(j => j.id === profile.nature_of_work_id);
    sourceOfFunds =
      profile.encoded_source_of_fund !== ''
        ? profile.encoded_source_of_fund
        : refs.sourceOfFunds.findIndex(j => j.id === profile.source_of_fund_id);
  }

  return (
    <List divider>
      <ListItem flex>
        <ListItemText
          label="Mobile Number"
          primary="0917xxxx"
          style={{
            flexGrow: 1,
          }}
        />
        <IconButton onClick={() => alert('clicked')}>
          <FontAwesomeIcon icon="chevron-right" />
        </IconButton>
      </ListItem>
      <ListItem flex>
        <ListItemText
          label="Nationality"
          primary={profile ? refs.nationalities[nationality].description : '-'}
          style={{
            flexGrow: 1,
          }}
        />
      </ListItem>
      <ListItem flex>
        <ListItemText
          label="Date of Birth"
          primary={profile ? profile.birth_date : '-'}
          style={{
            flexGrow: 1,
          }}
        />
      </ListItem>
      {profile && profile.guardian_name && (
        <>
          <ListItem flex>
            <ListItemText
              label="Guardian's Name"
              primary={profile ? profile.guardian_name : '-'}
              style={{
                flexGrow: 1,
              }}
            />
          </ListItem>
          <ListItem flex>
            <ListItemText
              label="Guardian's Mobile Number"
              primary={profile ? profile.guardian_mobile_number : '-'}
              style={{
                flexGrow: 1,
              }}
            />
          </ListItem>
        </>
      )}
      {/* <ListItem flex>
        <ListItemText
          label="Birthplace"
          primary={profile ? profile.place_of_birth : '-'}
          style={{
            flexGrow: 1,
          }}
        />
      </ListItem> */}
      <ListItem flex>
        <ListItemText
          label="Country"
          primary={profile ? refs.countries[country].description : '-'}
          style={{
            flexGrow: 1,
          }}
        />
      </ListItem>
      <ListItem flex>
        <ListItemText
          label="Address"
          primary={
            profile ? `${profile.house_no_street} ${profile.municipality}` : '-'
          }
          style={{
            flexGrow: 1,
          }}
        />
      </ListItem>
      <ListItem flex>
        <ListItemText
          label="Province / State"
          primary={profile ? profile.province_state : '-'}
          style={{
            flexGrow: 1,
          }}
        />
      </ListItem>
      <ListItem flex>
        <ListItemText
          label="City"
          primary={profile ? profile.city : '-'}
          style={{
            flexGrow: 1,
          }}
        />
      </ListItem>
      <ListItem flex>
        <ListItemText
          label="Postal Code"
          primary={profile ? profile.postal_code : '-'}
          style={{
            flexGrow: 1,
          }}
        />
      </ListItem>
      {/* <ListItem flex>
        <ListItemText
          label="Source of Funds"
          primary={profile ? sourceOfFunds : '-'}
          style={{
            flexGrow: 1,
          }}
        />
      </ListItem>
      <ListItem flex>
        <ListItemText
          label="Nature of Work"
          primary={profile ? natureOfWork : '-'}
          style={{
            flexGrow: 1,
          }}
        />
      </ListItem> */}
    </List>
  );
}
