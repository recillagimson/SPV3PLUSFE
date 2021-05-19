/**
 * Promo Card
 * @prop {node}     image Promo image
 * @prop {string}   title  Promo title
 * @prop {string}   description    Promo description
 * @prop {string}   amount    Promo amount
 */
import * as React from 'react';
import Promo from './Promo';

import Grid from '@material-ui/core/Grid';

type Props = {
  image: React.ReactNode;
  title: string;
  description: string;
  amount: string;
};

export default function PromoComponent({
  image,
  title,
  description,
  amount,
}: Props) {
  return (
    <Promo>
      <Grid container wrap="nowrap" spacing={2}>
        <Grid item xs={2} md={1}>
          {image}
        </Grid>
        <Grid item xs={10} md={11}>
          <p className="promo-title">{title}</p>
          <p className="promo-description">{description}</p>
          <p className="promo-amount">{amount}</p>
        </Grid>
      </Grid>
    </Promo>
  );
}
