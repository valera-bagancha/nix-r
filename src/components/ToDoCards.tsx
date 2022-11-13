import * as React from 'react';
import { Card, CardActions, CardContent, Button, Typography } from '@mui/material';

 


export const BasicCard = ({ item, onEditItem }: any) => {
  const onEditItemClicked = React.useCallback(() => {
    onEditItem(item.id)
  }, [item, onEditItem])

  return (
    <Card className='BodyCard' sx={{ width: 275, margin: '10px', backgroundColor: '#EAEAEA' }}>
      <CardContent>
        <Typography sx={{ fontSize: 15 }}>
          {item.title}
        </Typography>
        <Typography variant="body2" color="gray">
        {item.description}
        </Typography>
      </CardContent>
      <CardActions>
        <Button size="small" onClick={onEditItemClicked} >Edit</Button>
        <Button size="small">Remove</Button>
      </CardActions>
    </Card>
  );
}
