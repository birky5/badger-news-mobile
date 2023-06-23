import { useContext, useEffect, useState } from "react";
import { Text, View } from "react-native";
import BadgerCard from "../BadgerCard";
import BadgerNewsItemCard from "../../BadgerNewsItemCard";
import { ScrollView } from "react-native-gesture-handler";
import BadgerPreferencesContext from "../../contexts/BadgerPreferencesContext";

function BadgerNewsScreen(props) {
    const [articles, setArticles] = useState([]);
    const [prefs, setPrefs] = useContext(BadgerPreferencesContext);
    const [filteredArticles, setFilteredArticles] = useState([]);
    let shownTags;
    let doNotShow;

    const shownArticles = () => {
        if (Object.keys(prefs).length !== 0) {
            // shownTags = Object.keys(prefs).filter(element => prefs[element] === true)
            doNotShow = Object.keys(prefs).filter(element => prefs[element] === false)
            //articlesToShow = articles.filter(element => (element.tags.filter(element => shownTags.includes(element)).length > 0));

            setFilteredArticles(articles.filter(element => (element.tags.every(element => !doNotShow.includes(element)))))
            /* every element in tags is not in the doNotShow array */

            //setFilteredArticles(articlesToShow);
            //console.log(filteredArticles);
            //console.log(shownTags);
        }
    }

    const loadArticles = () => {
        fetch(`https://www.cs571.org/s23/hw9/api/news/articles`, {
            headers: {
                "X-CS571-ID": "bid_1c5bcd34828a97342b93"
            }
        }).then(res => res.json())
        .then(json => {
            setArticles(json);

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

    useEffect(() => {
        loadArticles();
    }, []);

    useEffect(() => {
        shownArticles();
    }, [prefs])

    return <>
        <ScrollView style={{backgroundColor: 'lightgray'}}>
        {
            // articles.map(article => {
            //     return <BadgerNewsItemCard key={article.id} id={article.id} title={article.title} image={article.img} tags={article.tags}></BadgerNewsItemCard>
            // })
            filteredArticles.length === 0 ?
                <Text style={{textAlign: 'center', textAlignVertical: 'center', fontSize: 20, padding: 35}}>No articles to be displayed due to preference restrictions!</Text> :
                filteredArticles.map(article => {
                    return <BadgerNewsItemCard key={article.id} id={article.id} title={article.title} image={article.img} tags={article.tags}></BadgerNewsItemCard>
                })
        }
        </ScrollView>
    </>
}

export default BadgerNewsScreen;