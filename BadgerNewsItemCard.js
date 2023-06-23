import { useEffect, useState, useRef } from "react";
import BadgerCard from "./components/BadgerCard";
import { Text, Image, Dimensions, Modal, Button, View, StyleSheet, Animated } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { ScrollView } from "react-native-gesture-handler";

export default function BadgerNewsItemCard(props) {
    const [modalVisible, setModalVisible] = useState(false);
    const [article, setArticle] = useState({});
    const opVal = useRef(new Animated.Value(0)).current;

    useEffect(() => {
        if (modalVisible) {
            Animated.timing(opVal, {
                toValue: 1,
                duration: 3000,
                useNativeDriver: true
            }).start()
        } else {
            opVal.resetAnimation();
        }
    }, [modalVisible])

    const getSpecificArticle = () => {
        fetch(`https://www.cs571.org/s23/hw9/api/news/articles/${props.id}`, {
            headers: {
                "X-CS571-ID": "bid_1c5bcd34828a97342b93"
            }
        }).then(res => res.json())
        .then(json => {
            //console.log(json);
            setArticle(json);
        });
    }

    useEffect(() => {
        getSpecificArticle();
    }, []);

    return <>
        <BadgerCard onPress={() => setModalVisible(true)}>
            <Image 
                style={{height: Dimensions.get('window').height - 600, width: Math.round(Dimensions.get('window').width) - 40, borderRadius: 20}}
                source={{
                    uri: props.image
                    }}></Image>
            <Text style={{fontSize: 20, marginTop: 5, marginBottom: 5}}>{props.title}</Text>
            <Text style={{fontSize: 10}}>{props.tags}</Text>
        </BadgerCard>

        <Modal visible={modalVisible} onRequestClose={() => setModalVisible(false)} animationType="slide" transparent={true}>
            <SafeAreaView style={styles.container}>
            <View style={styles.modalView}>
                <ScrollView>
                    <View style={styles.viewContent}>
                        <Image 
                            style={styles.image}
                            source={{
                                uri: props.image
                            }}></Image>
                        <Text style={styles.header}>{props.title}</Text>
                        {
                            Object.keys(article).length === 0 ?
                            <Text style={{textAlign: 'center'}}>The content is loading!</Text> :
                            <Animated.Text style={[{opacity: opVal}, styles.text]}>{article.body}</Animated.Text>
                        }
                        <Button title="Close Article" onPress={() => setModalVisible(false)}></Button>
                    </View>
                </ScrollView>
                </View>
            </SafeAreaView>
        </Modal>
    </>
}

/* styling for the modal overlay from here:
    https://reactnative.dev/docs/modal
*/
const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 22,
    },
    text: {
        fontSize: 15,
        marginHorizontal: 8,
        marginBottom: 8
    },
    header: {
        fontSize: 22, 
        marginBottom: 5, 
        marginTop: 5,
        fontWeight: 500,
        marginHorizontal: 8,
    },
    image: {
        height: 200, 
        width: 300,
        borderRadius: 10,
        marginHorizontal: 8
    },
    viewContent: {
    },
    modalView: {
        margin: 15,
        backgroundColor: 'lightgray',
        borderRadius: 20,
        padding: 10,
        shadowColor: '#000',
        shadowOffset: {
          width: 0,
          height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,
      },
  });