import React from "react";
import { View, TouchableOpacity, Text, StyleSheet } from "react-native";
import IconMaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import { connect } from "react-redux";
import FastImage from "react-native-fast-image";
import { updateTrackInfo, savePodcastOffline } from "../../actions";
import config from "../../config";
import _ from "lodash";

class PodcastItemOffline extends React.Component {
  constructor(props) {
    super(props);
  }

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
    let { item, style, onPress } = this.props;
    let { title, audio_link, categories } = item;
    const img_url = this.getImage(categories);
    if (!title || !audio_link || !img_url) return null;

    return (
      <TouchableOpacity style={[styles.container, style]} onPress={onPress}>
        <FastImage
          style={styles.img}
          resizeMode="cover"
          source={{ uri: img_url }}
        />
        <View style={styles.smallContainer}>
          <View style={styles.textView}>
            <Text numberOfLines={5} style={styles.text}>
              {_.capitalize(title)}
            </Text>
          </View>
          <View style={styles.iconChevron}>
            <IconMaterialCommunityIcons
              name={"chevron-right"}
              size={30}
              color={config.colors.blackTorn}
            />
          </View>
        </View>
      </TouchableOpacity>
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
    height: 100,
    width: 100
  },
  smallContainer: {
    flex: 1,
    flexDirection: "row"
  },
  textView: {
    flex: 6,
    marginLeft: 10,
    marginRight: 10
  },
  iconChevron: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginLeft: 2,
    marginRight: 2
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
)(PodcastItemOffline);
