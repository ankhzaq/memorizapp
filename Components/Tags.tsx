import React, { useEffect, useState } from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import { black, white } from '../variables';
import { classes } from '../utils/styles';
import CustomButton from './CustomButton';
import { useTranslation } from 'react-i18next';
import CustomInput, { styles } from './CustomInput';
import { Simulate } from 'react-dom/test-utils';
import input = Simulate.input;

interface Props {
  defaultTags: string[],
  onChangeTags: (nextTags: string[]) => void,
}

function Tags(props: Props) {
  const { defaultTags = [], onChangeTags } = props;
  const [tags, setTags] = useState(defaultTags);
  const [newTag, setNewTag] = useState('');
  const { t } = useTranslation();

  const addTag = () => {
    setTags(tags.concat([newTag]));
    setNewTag('');
  }

  const removeTag = (tag: string) => {
    setTags(tags.filter((tagOption => tagOption !== tag)))
  }

  useEffect(() => {
    onChangeTags(tags);
  }, [tags]);


  return (
    <>
      <View style={stylesTag.tags}>
        <CustomInput
          style={classes([styles.input, stylesTag.tagInput])}
          onChangeText={(nextTag) => setNewTag(nextTag)}
          placeholder={t('tags:newTagPlaceholder')}
          value={newTag}
        />
        <CustomButton text={t('tags:add')} onPress={addTag} />
      </View>
      <View style={stylesTag.tags}>
        {tags.map((tag, index) => (
          <View key={`tag-${index}`} style={classes([stylesTag.tag, index > 0 && stylesTag.marginLeftTag])}>
            <Text>{tag}</Text>
            <Pressable onPress={() => removeTag} style={stylesTag.icon}>
              <FontAwesome
                name="trash"
              />
            </Pressable>
          </View>
        ))}
      </View>
    </>
  );
}

const stylesTag = StyleSheet.create({
  tags: {
    flexDirection: 'row',
  },
  tag: {
    alignSelf: 'flex-start',
    alignItems: 'center',
    backgroundColor: white,
    borderColor: black,
    borderWidth: 2,
    color: black,
    flexDirection: 'row',
    marginVertical: 10,
    paddingHorizontal: 5,
    paddingVertical: 3,
  },
  tagInput: {
    alignSelf: 'center',
    marginRight: 20,
  },
  marginLeftTag: {
    marginLeft: 10,
  },
  icon: {
    borderWidth: 1,
    marginLeft: 8,
    paddingHorizontal: 5,
    paddingVertical: 2,
  },
});

export default Tags;
