# Mr. Bookmark

Mr. Bookmark let's you favorite your files in a sidebar. Now with git support!

![Screenshot of Mr. Bookmark](https://raw.githubusercontent.com/HerrSteen/mr-bookmark/master/screenshot.gif?raw=true)

## Installation
```
apm install mr-bookmark
```

## Keybindings
You can ovveride the default keybindings by adding this code to your keymap.CSON
```
{
  "atom-workspace": {
    "ctrl-alt-o": "mr-bookmark:toggle",
    "ctrl-alt-r": "mr-bookmark:removeAll"
  }
}
```

## Styling
You can override the colors of Mr. Bookmark by adding adding this to your style.less file
```
.mr-bookmark-panel {
  width: 240px;

  ul.list {
    list-style: none;
    padding-left: 0;
  }

  li.list-item {
    background-color: @button-background-color;

    &.git-modified {
      &:before {
        background-color: @text-color-modified;
      }
    }

    &.git-added {
      &:before {
        background-color: @text-color-added;
      }
    }

    &:hover {
      background-color: @button-background-color-hover;

      a.list-item-remove-button {
        color: @button-border-color;
      }
    }

    &.active {
      border-left: solid 2px @button-border-color;
    }

    &.extra-margin {
        &:after {
          border-bottom: 1px solid @button-border-color;
        }
    }

    p.file-name {
      color: @text-color;
    }

    a.list-item-remove-button {
      color:@base-background-color;
    }
  }

  .add-button {
    background-color: @button-background-color;

    &:hover {
      background-color: @button-background-color-hover;
    }

    .line-hor, .line-ver {
      background-color: @button-border-color;
    }
  }
}

```

### Next version
- Better color support for "white" themes
- Add all open files
- Add git modified files

##Happy coding!
Please report any bugs
