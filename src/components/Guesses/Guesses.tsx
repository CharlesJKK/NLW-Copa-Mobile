import React, { useState, useEffect } from 'react';
import { useToast, FlatList} from 'native-base';
import { api } from '../../api/api'
import { Game, GameProps} from '../../components/Game/Game'

interface Props {
  poolId: string;
}

export function Guesses({ poolId }: Props) {

  const [isLoading, setIsloading] = useState(true);
  const toast = useToast();
  const [games, setGames] = useState<GameProps[]>([])
  const [firstTeamPoints, setFirstTeamPoints] = useState('');
  const [secondTeamPoints, setSecondTeamPoints] = useState('');

  async function getGames(){
    try{
      setIsloading(true);

      const res = await api.get(`/pools/${poolId}/games`);
      setGames(res.data.games);

    }catch(error){
      console.log(error)
      toast.show({
          title: 'Erro ao carregar os jogos!',
          placement: 'bottom-right',
          bgColor: 'red.500'
      })
  }finally{
      setIsloading(false);
  }
  }

  async function handleGuessConfirm(gameId: string){
    try {
      if(!firstTeamPoints.trim() || !secondTeamPoints.trim()){
        toast.show({
          title: 'Informe os palpites dos dois times!',
          placement: 'top',
          bgColor: 'red.500'
      })
      }

      await api.post(`/pools/${poolId}/games/${gameId}/guesses`, {
        firstTeamPoints: Number(firstTeamPoints),
        secondTeamPoints: Number(secondTeamPoints),
      })
      
      toast.show({
        title: 'Palpite feito com sucesso :).',
        placement: 'top',
        bgColor: 'green.500'
    })

    getGames();

    } catch (error) {
      console.log(error)
      toast.show({
        title: 'Erro ao enviar palpite.',
        placement: 'bottom-right',
        bgColor: 'red.500'
    })
    }
  }

  useEffect(() => {
    getGames();
  },[])

  return (
    <FlatList
    data={games}
    keyExtractor={item => item.id}
    renderItem={({ item }) => <Game data={item} setFirstTeamPoints={setFirstTeamPoints} setSecondTeamPoints={setSecondTeamPoints} onGuessConfirm={() => handleGuessConfirm(item.id)}/> }/>
  );
}
