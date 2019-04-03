import React from "react";
import { TouchableOpacity, View, Text, Image, StyleSheet } from "react-native";
import IconEntypo from "react-native-vector-icons/Entypo";
import IconMaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import { connect } from "react-redux";
import TrackPlayer from "react-native-track-player";
import { updateTrackInfo, savePodcastOffline } from "../../actions";
import LabelCategory from "../labelCategory";
import config from "../../config";
import _ from "lodash";

class PodcastItem extends React.Component {
  constructor(props) {
    super(props);
  }

  renderCategories = categories => {
    const { all_categories } = this.props.categories;
    let categories_name = [];
    if (all_categories && categories) {
      if (all_categories.length && categories.length) {
        categories.map(category => {
          category_found = all_categories.filter(cat => category === cat.id);
          if (category_found)
            if (category_found[0].name != "Interviews")
              categories_name.push(category_found[0].name);
        });
      }
    }
    if (categories_name)
      if (categories_name.length)
        return categories_name.map(category_name => (
          <LabelCategory key={category_name} category={category_name} />
        ));
  };

  getImage = categories => {
    const { all_categories } = this.props.categories;
    if (all_categories && categories) {
      if (all_categories.length && categories.length) {
        const category_found = all_categories.filter(
          cat => categories[0] === cat.id
        );
        if (category_found) {
          return category_found[0].image;
        }
      }
    }
  };

  savedPodcast = () => {
    let item = this.props.item;
    item.img_url = this.getImage(item.categories);
    this.props.savePodcastOffline(item);
    this.props.navigation.navigate("Offline");
  };

  listenPodcast = async () => {
    let { title, audio_link, categories } = this.props.item;
    const img_url = this.getImage(categories);

    TrackPlayer.reset();
    await TrackPlayer.add({
      id: audio_link,
      url: audio_link,
      title: title,
      artist: "Cause Commune",
      album: "Podcast",
      artwork: img_url
    });
    await TrackPlayer.play();
    let info = {
      title: title,
      url: clean_audio_link,
      artwork: img_url
    };
    this.props.updateTrackInfo(info);
    this.props.navigation.navigate("Podcast");
  };

  renderSave = () => (
    <TouchableOpacity style={styles.controlBtn} onPress={this.savedPodcast}>
      <IconEntypo name={"download"} size={40} color={config.colors.blackTorn} />
      <Text style={styles.textSmall}>{config.strings.videoItem.save}</Text>
    </TouchableOpacity>
  );

  renderListen = () => (
    <TouchableOpacity style={styles.controlBtn} onPress={this.listenPodcast}>
      <IconMaterialCommunityIcons
        name={"play-circle"}
        size={40}
        color={config.colors.blackTorn}
      />
      <Text style={styles.textSmall}>{config.strings.videoItem.listen}</Text>
    </TouchableOpacity>
  );

  render() {
    let { item, style } = this.props;
    let { title, audio_link, categories } = item;
    const img_url = this.getImage(categories);
    if (!title || !audio_link || !img_url) return null;

    return (
      <View style={[styles.container, style]}>
        <Image
          style={styles.img}
          resizeMode="cover"
          source={{ uri: img_url }}
        />
        <View style={styles.textView}>
          <Text numberOfLines={5} style={styles.text}>
            {_.capitalize(title)}
          </Text>
          <View style={styles.categoriesView}>
            {/* {this.renderCategories(categories)} */}
            {this.renderListen()}
            {/* {this.renderSave()} */}
          </View>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    paddingTop: 14,
    paddingBottom: 14,
    paddingLeft: 20,
    borderBottomWidth: 0.5,
    borderBottomColor: config.colors.silverTwo
  },
  img: {
    height: 160,
    width: 160
  },
  textView: {
    flexDirection: "column",
    flex: 1,
    marginLeft: 10,
    marginRight: 10
  },
  text: {
    fontSize: 18,
    fontFamily: config.fonts.bold,
    color: config.colors.black
  },
  textSmall: {
    marginTop: 10,
    marginLeft: 4,
    fontSize: 16,
    fontFamily: config.fonts.bodyFont,
    color: config.colors.black
  },
  categoriesView: {
    flexDirection: "column",
    marginTop: 14
  },
  controlBtn: {
    flexDirection: "row"
  }
});

const mapStateToProps = state => {
  return { categories: state.categories };
};

const mapDispatchToProps = dispatch => {
  return {
    savePodcastOffline: podcast => dispatch(savePodcastOffline(podcast)),
    updateTrackInfo: info => dispatch(updateTrackInfo(info))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(PodcastItem);
