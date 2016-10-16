System.register('beeta-dev/ext-quickquote/components/QuickQuote', ['flarum/Component', 'flarum/helpers/icon', 'flarum/utils/DiscussionControls', 'flarum/components/TextEditor'], function (_export) {
    'use strict';

    var Component, icon, DiscussionControls, TextEditor, QuickQuote;
    return {
        setters: [function (_flarumComponent) {
            Component = _flarumComponent['default'];
        }, function (_flarumHelpersIcon) {
            icon = _flarumHelpersIcon['default'];
        }, function (_flarumUtilsDiscussionControls) {
            DiscussionControls = _flarumUtilsDiscussionControls['default'];
        }, function (_flarumComponentsTextEditor) {
            TextEditor = _flarumComponentsTextEditor['default'];
        }],
        execute: function () {
            QuickQuote = (function (_Component) {
                babelHelpers.inherits(QuickQuote, _Component);

                function QuickQuote() {
                    babelHelpers.classCallCheck(this, QuickQuote);
                    babelHelpers.get(Object.getPrototypeOf(QuickQuote.prototype), 'constructor', this).apply(this, arguments);
                }

                babelHelpers.createClass(QuickQuote, [{
                    key: 'init',
                    value: function init() {
                        this.id = null;
                        this.content = null;
                        this.userId = null;
                        this.username = null;
                        this.discussion = null;
                    }
                }, {
                    key: 'view',
                    value: function view() {
                        return m('button', {
                            className: 'Button beeta-quickquote hasIcon',
                            onclick: this.process.bind(this)
                        }, [m('i', { className: 'icon fa fa-fw fa-quote-left Button-icon' }, ''), m('span', { className: 'button-label' }, 'Quick Quote')]);
                    }
                }, {
                    key: 'process',
                    value: function process(e) {
                        DiscussionControls.replyAction.call(this.discussion, false);
                        e.stopPropagation();
                        var textarea = $(".TextEditor textarea");
                        var newContent = '';
                        var oldValue = textarea.val();
                        newContent = '[quote]@' + this.username + '#' + this.id + ' ' + this.content + '[/quote]';
                        if (oldValue != '') {
                            newContent = oldValue + '\n' + newContent;
                        } else {
                            newContent = newContent;
                        }
                        //app.composer.minimize();
                        e.stopPropagation();
                        textarea.val(newContent).trigger('input');
                        var pos = newContent.length;
                        textarea[0].setSelectionRange(pos, pos);
                        textarea.focus();
                    }
                }]);
                return QuickQuote;
            })(Component);

            _export('default', QuickQuote);
        }
    };
});;
System.register('beeta-dev/ext-quickquote/main', ['flarum/extend', 'flarum/app', 'flarum/components/Post', 'beeta-dev/ext-quickquote/components/QuickQuote'], function (_export) {
    'use strict';

    var extend, app, Post, QuickQuote;
    return {
        setters: [function (_flarumExtend) {
            extend = _flarumExtend.extend;
        }, function (_flarumApp) {
            app = _flarumApp['default'];
        }, function (_flarumComponentsPost) {
            Post = _flarumComponentsPost['default'];
        }, function (_beetaDevExtQuickquoteComponentsQuickQuote) {
            QuickQuote = _beetaDevExtQuickquoteComponentsQuickQuote['default'];
        }],
        execute: function () {

            app.initializers.add('beeta-quickquote', function (app) {
                extend(Post.prototype, 'actionItems', function (items) {
                    var quickQuote = new QuickQuote();
                    quickQuote.id = this.props.post.data.id;
                    quickQuote.content = this.props.post.data.attributes.content;
                    quickQuote.discussionId = this.props.post.data.relationships.discussion.data.id;
                    quickQuote.discussion = this.props.post.store.data.discussions[quickQuote.discussionId];
                    quickQuote.userId = this.props.post.data.relationships.user.data.id;
                    quickQuote.username = this.props.post.store.data.users[quickQuote.userId].data.attributes.username;
                    items.add('beeta-quickquote', !app.session.user ? "" : quickQuote, 5);
                });
            });
        }
    };
});