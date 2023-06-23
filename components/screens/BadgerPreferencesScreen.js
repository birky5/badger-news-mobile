import { Text, View } from "react-native";
import BadgerPreferenceSwitch from "../BadgerPreferenceSwitch";
import { useContext, useEffect, useState } from "react";
import BadgerPreferencesContext from "../../contexts/BadgerPreferencesContext";

function BadgerPreferencesScreen(props) {
    const [articles, setArticles] = useState([])
    const [prefs, setPrefs] = useContext(BadgerPreferencesContext);

    // fetch and put all unique preferences in the context
    // map those values
    /*
    const loadArticles = () => {
        fetch(`https://www.cs571.org/s23/hw9/api/news/articles`, {
            headers: {
                "X-CS571-ID": "bid_1c5bcd34828a97342b93"
            }
        }).then(res => res.json())
        .then(json => {
            json.forEach(element => {
                element.tags.forEach(tag => {
                    setPrefs(oldPrefs => {
                        return {
                            ...oldPrefs,
                            [tag]: true
                        }
                    })
                })
            });
        });
    }
    */

    const changeTrueFalse = (prefName, newValue) => {
        setPrefs(oldPrefs => {
            return {
                ...oldPrefs,
                [prefName]: newValue
            }
        })
    }

    /*
    useEffect(() => {
        loadArticles();
    }, []);
    */

    /*
    useEffect(() => {
        console.log(prefs);
    }, [prefs])
    */

    return <>
        <View style={{flex:1,justifyContent: "center",alignItems: "center"}}>
            {
                Object.keys(prefs).length === 0 ?
                    <Text>Loading... please wait!</Text> :
                    Object.keys(prefs).map((element) => {
                        return <BadgerPreferenceSwitch key={element} prefName={element} handleToggle={(prefName, newValue) => {
                            changeTrueFalse(element, newValue);
                        }}></BadgerPreferenceSwitch>
                    })
            }
        </View>
    </>
}

export default BadgerPreferencesScreen;