import { useEffect, useState } from 'react';
import { View, Text } from 'react-native';
import { getEvolutions } from "../apiGetEvolutions";

const EvolutionList = ({ id }) => {

    const [names, setNames] = useState([]);

    useEffect(() => {
        const fetchEvolutions = async () => {
            try {
                const evolutions = await getEvolutions(id);
                const chain = evolutions.chain;
                const nameList = [];

                nameList.push(chain.species.name);

                if (chain.evolves_to.length > 0) {
                    nameList.push(chain.evolves_to[0].species.name);

                    if (chain.evolves_to[0].evolves_to.length > 0) {
                        nameList.push(chain.evolves_to[0].evolves_to[0].species.name);
                    }
                }

                setNames(nameList);
            } catch (err) {
                console.error('Failed to fetch evolutions:', err);
            }
        };

        fetchEvolutions();
    }, [id]);

    return (
        <View>
            <Text>Evolutions</Text>
            {names.map((name, index) => (
                <Text key={index}>• {name}</Text>
            ))}
        </View>
    );
};

export default EvolutionList;