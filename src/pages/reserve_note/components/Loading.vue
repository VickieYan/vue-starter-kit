<style type="text/css">
.ant-loading:before,
.ant-loading:after {
  position: absolute;
  content: '';
  background-size: 80px 80px;
}

.ant-loading {
  width: 80px;
  height: 80px;
  position: fixed;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  background-size: 100% 100%;
  background-image: url('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAKAAAACgCAMAAAC8EZcfAAAAilBMVEUAAADLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vfZ5yhAAAALXRSTlMAufocJLDaBqL0FOWM0y3tfAyyUnXfyZw4xKuRYVpIMhiCcGZCzr1rTSGVhxC2QcRkAAAEeElEQVR42u3bh3qiQBSG4R80dJAmohQ71nP/t7du1R2EAQu4z857AeTLDDAniYEgCIIgCIIgCP8tY+9aibXaqHgLNV5dLu/uDTxE3Zx8k75TtNDByzkrTaHvTOmUq2jLscZ0a7pW8UrplG6ZloM2DhqVjFO8TKZQiTZEYzud7ikcvMRQonvkFZrxfKogZ3iBvU4VpDMaWNhULcTTdlRNGYDLGFOdJZ7kUh1zAR6b6ll4ypLqKSrqTYjniCckxKOhVk58Gh42Ib4ANVSTGvDxoBk1MFJRbUV/04ujNdkSa+rhERKx7Il1lPQWbwqTbo13P4/xuUaM7RmteRExtDm+O++Upku4p1uT6zptRuzDtkBLhs1uZX69s44N70KNbpxw4zBmT+YDWhmwp685rHz7zBrtsMScL6Uv4KCFocl+g8yZ4TfZY4euZPbQOW/ZLZqjMYe9RWx2SDVkuqq6cla7zOqUHR02aCjW2YfMq7291rjPoqsMZT7nndr47V+oKAnoaoL7ZrxV1oiRooGMGDPe/eWDVV6hA+45EmMHrjVd1azPQmYeUE5gxfxttR4QV8RIcNegQeBXOZA/zi1bjn8nvDcQYasB8UQMF+8OLI/sxxbj3wrvDyw/lVrj8W+NLgKxJ4bUcPzL0E0gYrnBgKhKxMjRVSDm5bOVO/7pMboLLE8nyoI3/jnoILBuQBzyxr9uA8sD4uhmC+PSAg/QdWB5QCRr8Kv9ROVbtPvA8oBI8izMsnCmEyPy0EVgmU+NSCp6CoRGDcyA3gKRENcEfQbiRBwJ+g2ES7VO6DsQIdVw0X8gMpmqpPiEQMwjumsb4zMCgXBEJboLfEwgDFdhZoflAp8UeJFbkU4/6FGyV4FPC7w4z/MgyOcGLj4y8DcRKAJF4IUIFIEikEMEikARyCECRaAI5BCBIlAEcohAESgCOUSgCPwfA/1PD5R6DaSrgv/XX9lAxzyd/vjCfRv6Y4rulPdvjwoR/ZajM+XlsVFlYNJPJ/RgST+NDqg08OnCXKMXqUkX0gF1nPVq76En6n61diAIgiAI7zS0ikhLDfRADbSosBzU2sn0nf61GqJT6iYxSx/3L0vpyraCrhbSC5Jxow/8n2X6izw9BQu8lxqHXzpd1f64saYyeXvcxR7e4rwJZyaVrNr/d+2oSNbxSzfciHfJVKe7NE5gFd2eLdN48Hxa5mrba1ubwB3xyeNCW6a5s1DbhjmbzJ1Iik48YfU1ZGpMH0e+ZoVpsImdgXG31lscnDgP0tDS/OlYp6ZqNmlND5F1U7G30bSQfiqm08hWxqYu0wNC1HCpd0vUmicm9UjXYvCouaVQL2R/baAZJ/RH1K3RbDdAG16+lLqKlG3rsd8WeBuXPYreEJekBzxBHWaW9KbKsb980TCiDgNXi1644/pWc4OhitfynCA8Srb+VJlSTNxsbuCNzk6eusevqdJiRUdK5E+W6/18gQ55h/kmSFfL42T2JRXR1raVn+zv557kz7RJ4u7SYDM/eBAEQRAEQRAEQfgXfQPvcF2SHfXUXgAAAABJRU5ErkJggg==');
  transform: scale(2);
  margin-left: -40px;
  margin-top: -40px;
}

.ant-loading:before {
  left: 5px;
  bottom: 25px;
  z-index: 1;
  -webkit-animation: loading-orange 2s linear 0.25s infinite;
  animation: loading-orange 2s linear 0.25s infinite;
  background-image: url('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAKAAAACgCAMAAAC8EZcfAAAAmVBMVEUAAAD/sAD/sAD/sAD/sAD/sAD/sAD/sAD/sAD/sAD/sAD/sAD/sAD/sAD/sAD/sAD/sAD/sAD/sAD/sAD/sAD/sAD/sAD/sAD/sAD/sAD/sAD/sAD/sAD/sAD/sAD/sAD/sAD/sAD/sAD/sAD/sAD/sAD/sAD/sAD/sAD/sAD/sAD/sAD/sAD/sAD/sAD/sAD/sAD/sAD/sABfRnP2AAAAMnRSTlMAufocsCQG24zlFPB8DHX01slCOCjEpJuRYdGrWlMyGKCCcGa9axDr30guIc6ylYdNUE5a6qcAAASISURBVHja7dvnEppAFIbhDzQ0KSKIomDv3XP/FxdTMYuwYIFkss9/mXd2KccRIQiCIAiCIAjCf8u4mFpfm3UUfITizW6HN6/Gkx/vnI86faMG9g5v588Clb5ZS+cnlsDXNnSvO3/vMoZduqdr5ZZgP6EUNcTbRG1KCb6gsKVDjyx8vMUXiR6RZyjGalIGOcIbXFqUQVqhgHGbstl42ZKyqQ1wGSrlmeJFJuXRx+AZUD4NL5lSPlVBvh7xnPCCPvEEyLUlvgBP6xFfjByKTgUc8aQhFdDK2+QZ/clZnLTegVhdC8+QiDXoaSepVeJOodO9zdLAN6NJ6sArlGa5xAhG+Ga1VOneOnsJL3RvkqxTZ01/ao9RkjFgt3KbnFmngmfhhO6ccWe/oT9t9iilobJ3PD/z7jMstMMS5/mi+6UevzrnmdEsssc+JWT2obNKbdEIhe1Sp4jBngEyJbKOHOUus9JlR4cOCvLY6ehg5Z5eczymUSJC2pEYVxTSIcZCQcqVEj08NuStckCMEAVExBjyzq8jWOkV2uOREzGW4JpTImd9xnLGBZpxJWXM31rpAXFGjD4eajwXyB/npiXHvzM+Gwi71IB4JoaJTwemR/ZTifFvhs8Hpq/KoPD4N0cVgbgQQyo4/kWoJhCeXGBAVCRibFFVIEYtdkA0uOOf46G6QPip6YQZEA12+lnvUEFg3oD4JX/8+4JqA9MD4vpuCz3O+FdFIFYHYmiNn+1nSo9/1QemB0SSh3YU2UOHGK6FygLTH+CTFNQUiAkVMARqC0SfuHqoMxBn4uij3kCYlOuMugNhUw4T9QcikilLiL8hECOXHjp4+DsCAbtFKS0T+GsCYZgqMztMx/ibAm+2muvQd47bvyjA3xZ4sxpt43g7MnDzVwb+IgJFoAi8EYEiUARyiEARKAI5RKAIFIEcIlAEikAOESgCRSCHCBSBIpCjjkCJEj4q1qDEgv/rr2ygYlaLfmvy35Tsojrp/bsgg8u8JFSJ9PIMkKWhJ7/yVm9KP6z3yNQ40o0+Ry1CnW6kPfLs5rOrhZool9l8B0EQBEH4JF9buEFooAZKPHEXmo9cS5m+cZqzimd+pdPXU6/7p4WUGGixgWpY1/6m0Av/K5n+IHfP8RifpXh2M5n2OV835pQmH05Lz8JHrDr2UKeUWfl/164X/blnvLXNW/a7LXpowgnM4gyG09Br4EWGF5nBwXnqD8xL4pPVxWQabndjpeya+Z3I7Elth3hsZDFkKszZuMeJZodxx/MbxsNaa7zfeZ04tLVJs6u2qKicTZrTU+SWrrYPbnch/bDodt1Be7N2ZHqCjRwm1W6KXKO+TjVyJh54lK3WplrIx7mBYnbJ3b0qreGygTKs7VSqKlIeaFcLT7A6Jvso+kBcP9zjBYofadKHKjfN6XWMd1D82AzcN+64cwjM2FfwXtYutk9S+6VOR130zGi0wgetdtvQPDW77TUV1lLdY286v4zGqJC1H3XicDY99YKmtHAPg7b6Q3twcLvScRj0+uYyjDujvQVBEARBEARBEIR/0Vee6bx4L0nP2gAAAABJRU5ErkJggg==');
}

.ant-loading:after {
  border-radius: 7px;
  z-index: 2;
  -webkit-animation: loading-black 2s linear 0.25s infinite;
  animation: loading-black 2s linear 0.25s infinite;
  background-image: url('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAKAAAACgCAMAAAC8EZcfAAAAk1BMVEUAAAAyMzMyMzMyMzMyMzMyMzMyMzMyMzMyMzMyMzMyMzMyMzMyMzMyMzMyMzMyMzMyMzMyMzMyMzMyMzMyMzMyMzMyMzMyMzMyMzMyMzMyMzMyMzMyMzMyMzMyMzMyMzMyMzMyMzMyMzMyMzMyMzMyMzMyMzMyMzMyMzMyMzMyMzMyMzMyMzMyMzMyMzMyMzMyMzNTpIRKAAAAMHRSTlMAufocI7D02gQW0ozt33wSvbLldVLJasSkm5FgDauggnBELmVYNwhNSDIpzZaHPibISAiwAAAEm0lEQVR42uzW15LaMACF4UOJy9qYtvSyFNPLnvd/uoRMdrAl25Iphpnou6b8CI/mwDAMwzAMwzCM/5a7CbyhNzuv8RTOeeYNvWDj3vj2+anZ4oXdby/wcPtZ3+aFXzrNnfxv92qM6i0dPNKox6iWt0Ae1SkltREeJrQp6X9DW9diksYeD1FtMEl5Bj3rJlNYIR5gYzFFaQwN7gfTtXG3LtPZFSjVa8zyhTsFzNJyofLBbB7u8sVstoNsA6occYchVfrItKVaHzcbUO0TGZwWNTRxowk1+GukmzHOahy9wYGi3ho3cEoUfQy8Y8nKcVO0GFXrurjYTaUPriO3cYeC/goX9a7NKN9Bmg2jpmP8mPuMs10oKK9Xf4sf66PmUzhlxAkR1RrjalXkUrEZ1/pOvX0mSBOtKAkHIH3BHjl8t8QfWEFMU+c/3vOqXEFcXfqLdtC28MWH2EWcW+bVDsnCzGNe98T1cYamlcW4wzjz8VoimcerELKmfKdqmVPQcCD55NVA4x5dIEGfghE0hBRMVM9XEyL5hKpIcqSgC6UlBQMkqZQjJ3xzILzcA3FGwRDKwBKS/VIHIlAMROXrT3huINq5BuKJggDPDpQn+zHH/Jvh+YEYUdDXnn9LFBGIDQUlzfkXophAnMsaA9FpULBFUYHY+dJAVM4/a4XiAuV1YldU82+B4gLVA1Gef1UUGygPRP8cmS+KAy4iEPUDBd6/CvdEef4VHygPRFqTdhi2JxYFnTGKCJQ1qaXh4EWBmFLDBHhZIIZUGuCVgThRYYjXBiJgphNeHYg2MwR4fSDCMtMs8Q6BWHSY6LDCewQCbZ8SKwDeJhBuYAvb4cvFOwUCztbrWPzL6gw3DvBmgRf13fbzc7ur44+3DPxhAk2gCfzDBJpAE6hgAk2gCfzdvp3uKAoEARwvDpv7klNAEBDv1Xr/p9tEs85OFMEDyGTq9wT/L5XupKtbUCAFUmALCqRACmxBgRRIgS0okAJ/Y6CDX07QYoxAbtRA/GK3v/7yFgwsZXg1gfuOeBXC4Di8WkMD/2ZJaEAF/qNCE2F6feUdQY4XugiNhPMgTwMYRWKcR1iER8pqsV7BSFbrRVACIYQQ0qeTZvtRYsEI5GXm29oOHgouF282WYgwKLmIp9d1/25r+qrmKTCM1IuNThtpFo/fsPCPJ0C/VrU7Yfg/XoEmFd7i94egXkEvrMKdT/HG4vnftbodB0flo211EIcM78paApswdZ4nR0GG9yj10oz27KUPzAG24w07y6tNqTwZKlu7IjFnnMSwjdsyJN0ww3cyzU28ot4JlnwvKVXEsi68ytUyJzQYdiVAowBfwjNDUvd+aHMXdhj6qmTojMcXuPCAiaPL4aFtPMURsazususp4Sh4p7Kgm9J1dByWPg8EeEa6ye2hInlVW6fwgrQw5wb2i1fjRIQ3yLtE43oaHMPJP3QZkXeeGfk6fgzbR6Z3kuGz0tJzD5zK3iqT7Jm53FrQI6vcJOZhEko6dqZLvjPLq/VWgQGl4rbwkkV+mEUTzvb3qipdqOdzz5lHs9gMEq/YiikQQgghhBBCyE/0F3lDloZgrqlHAAAAAElFTkSuQmCC');
}

@-webkit-keyframes loading-black {
  0% {
    background-position: -5px -48px;
    left: 5px;
    top: 48px;
    width: 7px;
    height: 7px;
  }
  10% {
    background-position: -5px -10px;
    left: 5px;
    top: 10px;
    width: 7px;
    height: 35px;
  }
  20% {
    background-position: -5px -10px;
    left: 5px;
    width: 35px;
    height: 25px;
  }
  30% {
    background-position: -40px -10px;
    left: 40px;
    width: 35px;
    height: 25px;
  }
  40% {
    background-position: -68px -10px;
    left: 68px;
    top: 10px;
    width: 7px;
    height: 45px;
  }
  50% {
    background-position: -68px -48px;
    left: 68px;
    top: 48px;
    height: 7px;
  }
  50.1% {
    background-position: -68px -55px;
    top: 55px;
    left: 68px;
    width: 7px;
    height: 0;
  }
  59.9% {
    background-position: -75px -59px;
    top: 59px;
    left: 75px;
    width: 0;
    height: 0;
  }
  60% {
    background-position: -68px -59px;
    left: 68px;
    width: 7px;
    height: 14px;
  }
  80% {
    background-position: -5px -59px;
    left: 5px;
    width: 70px;
  }
  100% {
    background-position: -5px -59px;
    top: 59px;
    left: 5px;
    width: 70px;
    height: 14px;
  }
}

@keyframes loading-black {
  0% {
    background-position: -5px -48px;
    left: 5px;
    top: 48px;
    width: 7px;
    height: 7px;
  }
  10% {
    background-position: -5px -10px;
    left: 5px;
    top: 10px;
    width: 7px;
    height: 35px;
  }
  20% {
    background-position: -5px -10px;
    left: 5px;
    width: 35px;
    height: 25px;
  }
  30% {
    background-position: -40px -10px;
    left: 40px;
    width: 35px;
    height: 25px;
  }
  40% {
    background-position: -68px -10px;
    left: 68px;
    top: 10px;
    width: 7px;
    height: 45px;
  }
  50% {
    background-position: -68px -48px;
    left: 68px;
    top: 48px;
    height: 7px;
  }
  50.1% {
    background-position: -68px -55px;
    top: 55px;
    left: 68px;
    width: 7px;
    height: 0;
  }
  59.9% {
    background-position: -75px -59px;
    top: 59px;
    left: 75px;
    width: 0;
    height: 0;
  }
  60% {
    background-position: -68px -59px;
    left: 68px;
    width: 7px;
    height: 14px;
  }
  80% {
    background-position: -5px -59px;
    left: 5px;
    width: 70px;
  }
  100% {
    background-position: -5px -59px;
    top: 59px;
    left: 5px;
    width: 70px;
    height: 14px;
  }
}

@-webkit-keyframes loading-orange {
  0% {
    background-position: -5px -48px;
    top: 48px;
    bottom: 25px;
    width: 7px;
  }
  10% {
    background-position: -5px -45px;
    top: 45px;
    width: 7px;
  }
  20% {
    background-position: -5px -10px;
    top: 10px;
    width: 35px;
  }
  30% {
    width: 63px;
  }
  40% {
    width: 63px;
  }
  40.1% {
    width: 70px;
  }
  100% {
    background-position: -5px -10px;
    top: 10px;
    width: 70px;
  }
}

@keyframes loading-orange {
  0% {
    background-position: -5px -48px;
    top: 48px;
    bottom: 25px;
    width: 7px;
  }
  10% {
    background-position: -5px -45px;
    top: 45px;
    width: 7px;
  }
  20% {
    background-position: -5px -10px;
    top: 10px;
    width: 35px;
  }
  30% {
    width: 63px;
  }
  40% {
    width: 63px;
  }
  40.1% {
    width: 70px;
  }
  100% {
    background-position: -5px -10px;
    top: 10px;
    width: 70px;
  }
}

.ant-loading-small {
  transform: scale(0.5);
  -webkit-transform: scale(0.5);
}
</style>

<template>
  <div class="ant-loading" />
</template>

<script type="text/javascript">
export default {
  name: 'AntLoading',
};
</script>
