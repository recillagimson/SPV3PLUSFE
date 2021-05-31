/**
 * User Info List
 *
 */
import * as React from 'react';

import List from 'app/components/List';
import ListItem from 'app/components/List/ListItem';
import ListItemText from 'app/components/List/ListItemText';

export default function UserDetailsList({ profile, refs, isBronze }) {
  let country = '-';
  let nationality = '-';
  let marital = '-';
  let natureOfWork = '';
  let sourceOfFunds = '';
  let showGuardianFields = false;

  if (profile && refs && Object.keys(refs).length > 0) {
    country = refs.countries.findIndex(j => j.id === profile.country_id);
    nationality = refs.nationalities.findIndex(
      j => j.id === profile.nationality_id,
    );
    marital = refs.maritalStatus.findIndex(
      j => j.id === profile.marital_status_id,
    );

    const nI = refs.natureOfWork.findIndex(
      j => j.id === profile.nature_of_work_id,
    );
    if (
      nI !== -1 &&
      profile.nature_of_work_id !== '0ed96f01-9131-11eb-b44f-1c1b0d14e211'
    ) {
      natureOfWork = refs.natureOfWork[nI].description;
    } else if (
      profile.nature_of_work_id === '0ed96f01-9131-11eb-b44f-1c1b0d14e211'
    ) {
      natureOfWork = profile.encoded_nature_of_work;
    }

    const sI = refs.sourceOfFunds.findIndex(
      j => j.id === profile.source_of_fund_id,
    );

    if (
      sI !== -1 &&
      profile.source_of_fund_id !== '0ed801a1-9131-11eb-b44f-1c1b0d14e211'
    ) {
      sourceOfFunds = refs.sourceOfFunds[sI].description;
    } else if (
      profile.source_of_fund_id === '0ed801a1-9131-11eb-b44f-1c1b0d14e211'
    ) {
      sourceOfFunds = profile.encoded_source_of_fund;
    }

    const bdate = profile.birth_date.split('-');
    const currentYear = new Date().getFullYear();
    if (currentYear - parseInt(bdate[0], 10) < 18) {
      showGuardianFields = true;
    } else {
      showGuardianFields = false;
    }
  }

  let bdate = '-';
  if (profile && profile.birth_date) {
    let bd = profile.birth_date.split('-');
    bdate = `${bd[1]}/${bd[2]}/${bd[0]}`;
  }

  return (
    <List divider>
      {/* <ListItem flex>
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
      </ListItem> */}
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
          primary={profile ? bdate : '-'}
          style={{
            flexGrow: 1,
          }}
        />
      </ListItem>

      {!isBronze && (
        <>
          <ListItem flex>
            <ListItemText
              label="Place of Birth"
              primary={profile.place_of_birth}
              style={{
                flexGrow: 1,
              }}
            />
          </ListItem>
          <ListItem flex>
            <ListItemText
              label="Mothers Maiden Name"
              primary={profile.mother_maidenname}
              style={{
                flexGrow: 1,
              }}
            />
          </ListItem>
          <ListItem flex>
            <ListItemText
              label="Marital Status"
              primary={refs.maritalStatus[parseInt(marital)].description}
              style={{
                flexGrow: 1,
              }}
            />
          </ListItem>
        </>
      )}
      {showGuardianFields && (
        <>
          <ListItem flex>
            <ListItemText
              label="Guardian's Name"
              primary={profile && profile.guardian_name}
              style={{
                flexGrow: 1,
              }}
            />
          </ListItem>
          <ListItem flex>
            <ListItemText
              label="Guardian's Mobile Number"
              primary={profile && profile.guardian_mobile_number}
              style={{
                flexGrow: 1,
              }}
            />
          </ListItem>
          <ListItem flex>
            <ListItemText
              label="Parent/Guardian Consent"
              primary={
                profile && Boolean(profile.is_accept_parental_consent)
                  ? 'Yes'
                  : 'No'
              }
              style={{
                flexGrow: 1,
              }}
            />
          </ListItem>
        </>
      )}
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
          primary={profile ? `${profile.house_no_street}` : '-'}
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
      {!isBronze && (
        <>
          <ListItem flex>
            <ListItemText
              label="Nature of Work"
              primary={profile ? natureOfWork : '-'}
              style={{
                flexGrow: 1,
              }}
            />
          </ListItem>
          <ListItem flex>
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
              label="Occupation"
              primary={profile ? profile.occupation : '-'}
              style={{
                flexGrow: 1,
              }}
            />
          </ListItem>
          <ListItem flex>
            <ListItemText
              label="Employer"
              primary={profile ? profile.employer : '-'}
              style={{
                flexGrow: 1,
              }}
            />
          </ListItem>
        </>
      )}
    </List>
  );
}
