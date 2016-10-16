import { extend } from 'flarum/extend';
import app from 'flarum/app';
import Post from 'flarum/components/Post'

import QuickQuote from 'beeta-dev/ext-quickquote/components/QuickQuote';

app.initializers.add('beeta-quickquote', app => {
    extend(Post.prototype, 'actionItems', function(items) {
        var quickQuote = new QuickQuote;
        quickQuote.id = this.props.post.data.id;
        quickQuote.content = this.props.post.data.attributes.content;
        quickQuote.discussionId = this.props.post.data.relationships.discussion.data.id;
        quickQuote.discussion = this.props.post.store.data.discussions[quickQuote.discussionId];
        quickQuote.userId = this.props.post.data.relationships.user.data.id;
        quickQuote.username = this.props.post.store.data.users[quickQuote.userId].data.attributes.username;
        items.add('beeta-quickquote',
            !app.session.user
            ? ""
            : quickQuote
            , 5);
    });
});