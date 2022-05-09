import React, {Fragment, useEffect, useRef, useState} from 'react'
import ViewAllCard from "../components/VeiwAllCard";
import ArenaCard from "../components/ArenaCard";
import SearchBar from "../components/SearchBar";
import DropDown from "../components/DropDown";
import BasicButton from "../components/BasicButton";
import {Box, Modal, Typography} from "@mui/material";
import {useDispatch, useSelector} from "react-redux";
import {fetchPokemonInitialData} from "../actions";

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
};

// const initialData =[
//     {
//         name:"charmander",
//         type:"fire",
//         attack : 3,
//         defense: 5,
//         url:"data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wCEAAoHCBUVFRgWFhYZGRgaGhgcGhwaGRocGBwZHBwaHBgcHBgcIS4lHB4rIRgYJjgmKy8xNTU1GiQ7QDs0Py40NTEBDAwMEA8QHxISHzQrJSs0NDQ0NDQxNDQ0NDY0NDQ0NDQ0NDQ0NDQ0NDQ0NDQ0NDQ0NDQ0NDQ0NDQ0NDQ0NDQ2NP/AABEIAJ8BPgMBIgACEQEDEQH/xAAbAAACAwEBAQAAAAAAAAAAAAAEBQIDBgEAB//EAEAQAAIBAgQDBgQEBQIFBAMAAAECEQADBBIhMQVBUSJhcYGRoQYTMrEUQsHRUmKS4fAVoiNygsLxFrLS4gczY//EABoBAAMBAQEBAAAAAAAAAAAAAAABAgMEBQb/xAArEQACAgEDAwMDBQEBAAAAAAAAAQIRAxIhMQRBURMiYQUycUKBkaHBsRX/2gAMAwEAAhEDEQA/ANYlrU51Kz+ZZI9tRRSYNGgqVJ3HJqWDC3kKw5IJEkZmA31I57e9W4niFtUZ8zZk6oyZzEwkjevBp9jraXccWMMy7ADuB6CB7Cpm8y7g16y+isSwzAEBonUTHjV+cUgSrg5bxANWZxUVYHpUgi9KErFZ0PXQ1RNleRIqt1Yba1TTQbMvzV4tQ4BPI1F1NLVJBSJ37akaDWg79kllKuFX8ykST4GrxNdUClYyjKa8CaLVJqJs0DsozEdasS6asUMKtdoG0+FGwWRRwanlBqKhSJiKnkEHLoY0nryoUfklg2LwCupUyJ5gwfWk9z4YGmS64gk9TqNpNNMCt8Ai4QTOh0iPIUwo02c2XpcWR3JWY67wm6jSGDL/ADLr6+tD3Q+xtiCdf3rbvbkRMd4qDYdTuAal4k+xxy+mY/0swd12WCto6TvtzjY9daqbiBBiCQTpz0/T9TWzxHB0MwN+/wDSgf8AQ1MhlGuxG4qXCK5RzT+m0qTENzGgqOlUnHKm56Rz3MeVOLnwkoBFpgsj8wJ11gkzrvSzE/CLjds07xIA2zZRrvEx1FEcUTjl9PzxdtWvgownEszFj67BV/L3SR2j40xW8Ylog8yeu33oA8FC7g6bA/TPUjmdfYUMExGVzlDjSCSFX94GtKWBSdxIfTZOyGzX0UEmBMiOZ1jbnU3ugACBB9O6kuVyAWUq2uu6klidD51M2bxB/Wo9HyyJYckdmmNvxMCdO7WB60M3EBmhpAIIK6HtDWQecj7UDi0KrlzTEZmJ1ZyPpReg5mlGLF0flJIhgOY1AHqCdDV48MX3M0m3VmjGKQs0E5QdSebdO+NatTFKZCDlB6dND3Vn0BQAEloUQBzJiSe8kmrsFjivId7bCeg605YttiGnyh1hMQc8HQSZnfoAO4feiDcDtoBGgnf/AM0q/H9rMBuBP9vI+1eXHgEs2s8tgB+9Q4vwCl2HmJBGoJjuqhcSygg89KEt4rNl1+o/SNlGpBOkyYqs3M/1EqOfUk7KPIiaVIuUt7iMbOIG5MGde/zqxsWp3g9BMadaEfCiOya4MEOba1la8gpySo1Koeh9KktrWZPgTp6UtbjSNpbupmnZ5WR3TFMrV86BmWSBzHnFd1I+2OjDnWSWHQwQPDSqHsSSczDz0FHtcy7a15nDbb06RNsWvbYDstJ5A/vVmGuXNMwir+0DEeekVeoJ3Ao0tjbPJeHOrJFc+UvSvfJU01Fk2iUVEuBvUltxzrzJ50U12FscVga9kBqi4SNlNdGKXmCKE75KrwWfLqLWjXVxSdamL69adRFbICa7Nd+cKl8xTU6V5HbBcZZFxChJExqO77ipYO2EQJJMczvV/wAtTXjaHWnpYWiNy6qgsxAA1JJgAd5pRf8AiO0v0Kz94GVfVtT5ClXH77uRp/w5bJr9TLGZmHKCwjprsdloqMknB01udmDpo5I6m9jQf+pf/wCX+/8A+lX4f4ltnR0ZO/Rl9Rr7VmK9ULLI3fR42trPoFu6GAIIIOoIMgjuNSmsTwziLWDzNsmWXp1ZR16jn41sg0gEag7EbEGtFK1aODLheOVMk1DXMKT+dhQVzF4jMQtrQExPMdZkVJMdeH12WHeuvtSabIJJhrqtqVdDO4gr08RQuIwIIaYWR+QxJ6lSY2pj89j+U0LiLYfqKKZnNNbxSsUthrKjKbmTTUMD2mMwY2A8KqxuFcAN8+0qETBbKCN5A5RReI4eGUgwwPI6e/KqTwVChX5aCYksS0AaaDlppp1NFLuedmwZcz9y/ujPXlNtkzOjcwUYOST3R2dIqOIuNmVghhhmDESTMgk+EHTqRWgX4dsblAW7iwHlrpR+CwWTQIqjrJJ8NaGo3aOP/wAqTlu6X80ZIYAvqobNHQ9O7bU8u+r7nDn7MoIgAsVjn0jatVdS5+Vh/T/eovZuERmA8Br70qfk2f0eNfc7/Bml4dClWgLKwwOsE6wd/wC9U8Q4cbkMpC7ALoQFBOpO0mT408xHBiVMlmIBgBgDvIA2FA27d2AhtMNgJVeXOV0jTnWfuW65POy9HmxVs/23Ey4dxAzRIgwT4/V9zHhRSPqGOh6bx084ijMRhbgaFQA669mJ79dZqQ4dc/g9Cv70Nt8o5XgzP9L/AIBmxQzDXXVR0/w6eleONMSAdyPSvPgXUF3QgRrscvPl+lca7yABO/Pnvt5VLil2M5RlF1JNEbmEYkKUBXrp++lWNwvMoUgwNiTqvhR6vI01q+2a3UpM+9aSJ8MvvbUJmLgHdtSB08BWlVNJDA6UgUkbCjbN6BtrTW27JfwHhjUkuUEMVXfnikpMKDi4O5NAOrA9kmPGu/iKFtW0V2cFpbcT2fSiwSGa41VgOwBPWpXMaBzEdZgUrxaow7XvQV2yjLl5co5VWthpQ8/EMdQQQdv7Go6AyZ8CdKzgwLRC3GA6ax7GisNadQczZv8AO+psKGzXbY3IHmPtUxikHM+lJrmHVjJGtdRMogbUWFD0usAkjXrXQG3C+GopCXjeR71ZZxJGgZh607XgKY1dyN1I7xSf4l43+Gw7vM9mFBG5MAA9QSQD3TXsVxp07CHM3MnZf3Pd/hzHHbFzEgK75hzDDY8ioWBzOnvWmKcIzWp7F+hklBtKwX4d4niMRZU3iCqSqECGaTLsxntMTAnT6TTaqsNh1RFRBCqAB/nWra58+T1JuR6mDH6cFE9XbNp2LZVZgsTlVmjxgaeFBcWxwsWmfcjRR1Y6KKTcH/8AyFcw+EawLea6S5W6W0BdixJSNSJMaxoK36XpfVtt0jDquq9GopWzRo4IkGQdiNq0Xw7fZlZJ1QiNfyNOX0IYeAFYb4TtZcJabX/iNe3P8DhZ9/atd8OOVvHobbT5Mkfc1EoelkcGycklmwa6NGGZd5qa4iujECqrrgjQU78M4Cz5k70HidD2farQKg7xU2x0RQzvk/U1JkWNN+5hHvUM46VHQ8qeoKIuY0PtXQ1cKjpS3iPF0tHLqzaaDpMHXrE+lKrKjCUnUVYzzV6TyoezxCyRObTvBoW/8S2kYqEdoMSFEHwJNCi2J7cheIRz9LBesrNBYi05+q/l/wCVYpdf+KMQWISyInSQxMd5mKZ2+OpkHzFbOROQKSJ5Q21U4tGc94tGUxT4m3cYhg69SAC2/XYR31ThuMsCQjkZtYGs946Ux43xt7pCosJInMNFAOhzDXUHUfy6GlGIxClW1AYCDCwI1hhG45Vqo2t0eDmxU3JSaq6+SbcROYjM2YxzJGx0jp+9Vfjcux1PfGg0oOyqswEnQ+3MSeU9aYnCKI3JAjswCRoRPgZB8qTjFcnmSSv3GnYIg7KMe/33odBcckrI18PvTvD8HdRBdSDl0iIyjTUb+fQUY6ACcozTyPLrWVn2liKzjb6mGSR4a+opn89iFIttrvsCPI1M4dG1K61d8tcuXl4n70rQytQCJ189DUXYLv8AY1K9hiwAVysdP1qaWiFEmTzoAqzr1jx0+9SKe9WqvnS7iPBWuFWR/lkb/wAJ74GxpJIA1MMj/Vy21irE4agM6+tJ14PjU2vo4/mBB7oNL7/GL9i5kupynMuoI66HuPpV6X2FZshhk6V5rC8lFJLPGgSFMgxO1H2uJK2xnlUboKLAic0YHuk1wWEOgLeMVS+KbcE/596n8xiaeoKKr+BdT2e0PKagbZXkRTNbi99eFwUMe5jHnM87/Mf/ANxA9gK5R/HcPlfOohX0Pc8QJ8QB5jvpczR1NYyW56uCScFRKvV6vVJsIfiuyXW0uuTOSx8FMesmsfieHOmYx2RtzJkwABvOor6Y6AiCAQeR2oZeHWw6uBBRgy81zLqpytI0OvlXo9L1cMcNMk/yjzOr6PJkyaotfh/4F28J8i3Yw5jNatKHjldcm5cH+5aYcDuMruQNkH+5j/8AGgGYsSzEkkkknck7mmfBE0dv5gvos/8AdXNPJ6mVyNpw9LAojkYvqtTGJToaEY14pTOENFwHaulJoEKaNsvoJpAe+WKoxFlsrZNGg5dt+W9GVygBJicU1i0HuQX2gbFtY9hrWTdnvPJ1Zj5f+AK0XxiBCHNrLQvdAlj6AedIOHYv5Th8uaAQBMb6T6TVLZWuT1ekgo43KK3dmgTEWAMl0wyKssB9Wmw0mdKKt4m2ULoiak5ZAJgaTHka9iuHWsSgLLqwUhhow5jUUCfhdkTLbumB9IfWN9JWOZ6U8eSMl4Z5WRSUm2LviDFjKACARrmUQc0iBp9qI4Rdt4lD9SOvZdc3ONx1B196Xv8ACOKYFS9uCZY9qT0gRVuD+GL9kyHU6jOBPLx7vvW0lHTzuZNanTQbjfh/MsKxB5bbUmxfwxcgbHaSskkacuW0+Vauwl5TrBUd+vrR6XdBKkSY5GO/wrFTlHgyydLCao+Yjg+ItmVHPKJkaQTJ+0VSqX5IysDp0kgc/DWvrH4dH5UO/CxT9Z91Z5mX6e72Vh6EHY+lcNusJY4PiFeUYp4Ej1GxrTcG+emYXTmEyCTJk7+AqJRpcnswmpK0H4rDl1IByzzFRw2EZFgtm/zaqMNjAWcSwhp7W3eAemlFpiAwkajqNqk0JZDXshqpMUGYqAdN9DHrVwuUgIJZCiAI1J8zvVVrCENmZsxAgaRAO+g0osGvGadgVXQRosyQdSOyDymkL8KxDXBcdkYrtqRMTA221rSa9K8vhQnQhVgWuMSty3ljZhBHeJosYdJgAAmT0J6mjMteKDmAdI8juKQWD/gxUlw0VbZtqihVEAbCrJoCyj5NB8VUrafsZ9CCJjsnRie4DXSmk1TibQdGQkgMCDGhg9KaHZhroZrZTO5BUiM7ZdtNJ08KTYDFXwGDDOFMCQZiAQcw8eda+7wNwTkdSOQbRv6lEe1JcbhnstLo6Az2gJAJ6MJBBOsHWeVaYnypK0d6yY204ugYcU6ofIg/eKnZ4krMqkZASAWdgFWebROlSYq4+q23fEMPMGuPhkKorZVy5pKaM2Ylu0xJmJ0gAjrWmnp+d/waOU3x/OxQ3EHZiqKDqY3MidDyyjxo2wHVZdwT3CAO4czVdu6i9i2snooJPiY186jbtuznOCmU/QdyeU93PvrGai1sqX9jU1dXbDac/DrCHXnmDeRUL/2UmrlsZGzKSrdVJB9t9qwi0nuVmxucdKNk1gcq8tqKztji91dyHHeIP9S6e1NcHxdHIUyjHYNzPc2x8N61TT4POngnHlBD4ckyGjuioX2dFkZAerTl/tRZaaoxVgOjLvIpmQPaxzkahSZ2RgdOup0q+xfZiAQdROsR4aGleH4OqkyXUgiCCI+1MntnQq5WO4GaWwzCY1y1xyxJOZtzPM6eFTweBe5JRSQIzHTSeg5nuq/j1sLiHjQGG/qAJ95pv8L31KMn5gSx7wdtfKnkm4xtHtSyuOFSivA3wlnIirM5RE+HdRQvihrqTQz2DyYg+NY4k0tT7njTep2yjiuOxCHsWyykgDL2mHWQNvGkGDx2JtXnLJm+ZlYoxOcBQZI1039qdX7d8bEMOXWo4biWYjMoV9g0fedRXUpVGqIoYWMUHAOV1mNx17xVrEiuJfnYg+FeZ5rMZB7zplJSQxAOUyVnmQQJFEDE0K01zKaTA6mMQ/SZLE9T3aDkNKmlzNry6j96+bWOJuRAYj8oAnbnMb9Ke4b4ifIcrAABQqhQAJEBRTcZL7jyem+o3tlVfg2ajok+NSOLywCkVmcL8TFEy/Wyhe11J6nr+9E2uO3DDMAV56ad4mij0IZ4T2T3NCuNQ91UtiugobCcSw7EAKQx/lmPSnSKp2inpNboWfiTXVxJ60ybDKeQ9KofAL0jwNLSw1IHTFdavS9POh3wDflM+NEYS2I7SQR1FJRYNo4z99QNyOdHKF6CvNbXmBVaRWCLcqYbvFWnDp0qLYZeU+tLSwtHNa5rUcjDY1IFqVMZ6e6oXrgCsWEgAkjqAJIqzP1FUY1hkA6sg8i6g+001yAGOCWyiqUSQNeyMuY6tHQSTVafD1ofkT+mfvTmu1LECYbAIghVA7gAB6Ch+M8O+YuZPrUdn+Yc1P6HkfOmdeoWw4ycXaMIrT/fcdQRyNdo74gweW4SPpuCfBxo3r2T45qz6C6DC+8x60lju9z1YZtUU65GVcIqfD8NdullASVAP1MJBkadnl+oq5+HXgcpVZO3aJB88tRpaG80E6bJYTirIyozSp6zKjrm5jbQ9aeJi5218Kzlzg92SXldeyBBXaDrE7zTCzwl0UNueoPI8orZcfJ52Vxcm48DX8QDUHcnZo8qhhrbZe16nc0PjMULYkqWBMDLBk9KXJCXYX8fsAhToXOx2JA3nu1HnRnA7VtLcqZJ+snSSJBA7gZFKL9xnaSRnchR0Ufsok9+vWn1i0oRVXVQAB4fvUyjqVXsdU5ShBQb+Twx6NqQwjuP6VL/AFJO/wBK4qxzoH/Tf+JnzaTJBGp6jwpxSSo5RkvELR/OKiww7mSUJPfBoHE2rQ+oBZ25faqTgEO0+s1WwUNDw22dRI7waqfCZRHzWBB37ukUvTCsv0uRXWa+PzZvGD96BDVbi6CZ035z4UPiEZjKXQB0Mj3jWlaY1we0J9quGOXmCPKlTHsYBMK0wJ8Y21qz5Tqp10AMco3E+OtfRHwNg/kIrj8Cw7rlIkdJ/eun1ovlHkS+nOz5zhsRl318/wBKPwvEAdCSP85AVpH+BEJJF19ZMQvppsKsPwQsaHX/AJj+1EnjbsWLopweoX4a84BKPlYiA0A0RhMbi0YEuGE6+HpV1vgL2BDupH5RoCP3roQDnWdpbI9WEdtxlb49iAxzZCvIZSD5mats8fcTmAPSBpSvMOteLdIqbZWlDmx8QMTBTfpP2q1OIXCDIAPL++tIrbQQeyI5irQ7E6P7/pSthSGv4p1Ilt++ibjsBmLSO40lyOdzNXHPEEmKQUNrV2ROf3ohH/mn0pHakbmrhe76BUNWed6mHHImlK3451L8XrQFDb5nXWgOIYlFyAnVriZRzPbUHTprvQuK4mEWd2Oijqf25nwrP3XdiXJl9CCeo1XwAPKldcm2LA534N3Xqqw14OiuuzKGHgRNW0jA9Xq9XqAFPxHbm1m5o6H1OQ+zms3Wq45/+h/AesiPeKytTLhHodG/a18l2ExPy3V+Sntd6H6vbXxUVr0vKwBEEHUEGQe8GsO7wROx0noeU9xqyw7p9DZR/Duv9PLyiiLpUys+BzeqPJtSQa4yjlWWs8VvLuVPiD+9Rv8AEbr7vlHRBl99T71WqK7nNHpcj7UNeLYxF0ks42VTtP8AEdlHv3UgdySWY/sB0HQVFmCjoKM4Rg/mEXHEWxqin855MR/CPfw3EnL8G6jDAre7C+GcMBXO85mHZH8KeHU7+EUwtYZU2q1ri9aiWHWqpHFOTk3Jg2Ms5hoxXvG9VN4miXSaoa2RRQkwTFYXOIJ8D060HdwriACWUbcvKKZXEMGDBgx0nlVdiwyqMz52MT2Yg8xpuKpKgFiWrg2DCrExFwbifKmQmuEmjkYE6OzTlINW3MG53Kmr8xq3EKUjUGelKgIC6KhbxSNOVgY08/GgsNmecpGnWiLauiFFAySTA1iTJjzpUOxomPjcCiLeOUmNRWb+cetVYZ3B7RkUUKkOuKcNztmRgpJ7WY+ERVFrgaka3de4afeqBdPWprdNFsWkjf4KwICOCD1kGfKaKt8GhBqC431Md1VpiCDNWjFmZnWi2Gk8vCyd1A865/puX8p+9EDiTDoamOKj+H3pWPcFykVcCRvTNXzAHeaGvW+eSfA6+lFisoZVbeomwvLbzog4Ud4qp8Kw2M+1MZz5KgVQ9sV1iwMQZ6Vb+GffIaAEPE3C3AG/g7PmTm+y0McUnX71bxvCXLjD5ZllEwdAo568y0RHdPKka3tBIIkA7Egg8wRyrVYNUVJ2dOHqKWldjWfD3GlU/KbRSSUJ6nUr6yR4kdK1SsDqK+VG4p6+hp1gPiY2yEuEn+YakD+defiNe7nUzxNbxMcsd3I3lepZheLK4zKVcdVP36Gqcd8Q2remrP8AwKQT5/wjxrFbulyYrc98SX4thObsP6UIZj6hR/1Vnq82Ka6c7ntHSBsoGyj9+c16pnzXg9Xp8eiG/c4ygiDsahYJgg7qYnqNwfQjzmrKBxV0q5gx2Fn1aP19KIJydI1lJRVsNJjehb2MA217+X96FRXfaT/MdF9eflRuFwxQz2WbqQdPATp963WGMeXZyz6rtE9h8G7kPcHZ3Cnc/wDMOQ7t+vSmd3GvsFEeMVWMZH5Pf+1SS8pGoOvdTbs5JScnbB7mOujWBFQXizjcUeMEOURyqN3h2fms9aLRJXb4qOseNWXMcv1Fj5MfsDVC8Bc7MD5GiP8A020fWJ8KPaIEHE1nZ/6yfY0Va4ih/MfMD7iqG+H7oOkHzqt+FumrpptIYH2p+0A9MYJ7ToR3SP3q174KnIVZuQkUmSyrTBIjqKIGHTmD5Gk6AJN9x9Vv0/w1RcxnQEdZE0RYYIIEx31f+IosDNpfZTIJB7qJHFbgB1k8pAoRrLDcV5UNAFlnFO0lxrPr5UVnIg9RI+1UC3oCN+Y/WrQ+gTpJHnvUNo5n1KpP5Sa8WWC7UhdqNpFntHTuia5fVQTlmO+lqTdFR6qEsjxrdrnwv3Lhdrnz6DZqNv8ADWW0LodSIBI8e/mao6LC7mOtlAAhD6a8u/XnQgv0tzmpK9PSA4tY910DadN6IXjD849KSo9WZqVANbnGnAmAe4CoWuKO2uo8YpQ56VV85qKAfrjGzqxOgOsabbe9EPxG20l5B8dT7wKzIxBrov8AUU6AIxOJZHJLk2SWdlRQXbYBGPSI1BAIU9a6l9MV22HyrVuRmlQxJH0yRCgDKfTvryYpYAgadwr14WnnOgM66SusROnPQV1Q6lxjpkrRi8W+qLpmcu4o7LtJGb+IAxIB2B31qkKKf3eDYdvpLpp1nXzpZiPh9hqjhu46GhZIv4LlqfIA6Hkfcj7V4XLiiAfYfpVV/DXEMMrD7HwPOpW7Vw848a0VEKTjwOsBjNJ/qXmDTRLqnYis9gLZXOGIJkGe6B+1FsY5T6frXNlwxkz0sOaSirGlzEKu5plw7hYZc9y1mZ9RJ1VPyiOu5/6qz3DUZr1sFVIzHsN+YhSRJ23G3OtJxXi+JUEfhnIGpZefTblUekobLkzz5pS9vY8hwzSA8xp9Y8P0qf4W0dn18QaxdhGuO2c5CBqDo7MSWJA6TNG/IOyO4blMMCe/QGm4JPk5UzSHhv8AP/t/vXkWz9BeWmNZGvQcqylnH3yWTTOhMrJ18INNMPxJxBM8tGEwT70nBoadj5MMh2AMd8+tefDkA5IB5UDgOIo7FCmQt+YbN5jUGmDYq2pAzjpvPr0qGmh2U4Y3lBDMPLeugupkMZ11Ov3qjFYoZsq3cpHVQVP/AFAUDjsReC9m6nioBPmCKajYWdZ8QW7TtI3gwPKNKva85UzOmsEyPQUju8SxCas9tv8AmAH7UZhOKvAzBTO8GqcGJNF/y7p1hfDSaCL4lG7Vto6QT6MKP/1YDXIdAToRv0r1v4kSYdHTykU0n4Eyp7emucabnYE9aFdWBgmeciRRj8ew5b6m/pMVW/EbJ2ceYP60aZLsFoqN8sNYrhaKWnhoUEqzL0EyBR/w7hLl698pmgAFmI/hGkAHmZAp6E+GTNScWk6fk7fu5ULDlrQ1/HBXDDZbeY+LfSPUrW8fgNj5ZAtqVO5dnJPoZrN8Y+DC+ZrUAdnTOSpyiACGAIA33M1ccS/UcOTFklvtbq68oVcOd3cIozOe0Z2VTzP+dOtaW3hbqjSPb9azGGxiYQNLlrr/AFEA6noCRoBReE4/iMytdVRbYiNiYPORrPlWc8Nu0tv+nPDFgwK8u75rxYfewT7lT6ftQj2TWr+esSZqLPbKk7gCdRWSZ60csHDVFqv8MomFZvpBPhXHsMpggg99aUYElQyHKSJjlB1oe9gLp3g+YmjUVCWpJ+RGq1YKLfDEGIj0qHyqLLKlSakLI5ifOKvRKsy0rHQL+HQ8mHgZ9qr/AAgzRm06wftR2WvZaeoVC1sIc0KQe/b70RhlTKAw16kUQUFc+WKdhRIWEOwHkaiuF6CPOuZBXQpHOgCTYckQVkdNxSjGfDwYyko3Q6r/AGpwHYc68brd1UpOPBLVmUsYV7VwLeBVGKgtoQACdQemvlvTu/wwfiBaRoDWy4J7RAU5WHKdSvqaZXL+YFWRWU8j/mlKb9llZHR2BtiEDdqBJOUtIJXUjwrqx5otVJGcta+1nl4e4tG8r9u3cYso2AtuQ0HfNCk+cd9aLDYq6yZg0jxGYR41i/m3lu3HUwLpbNbOqkNPOdGE70XgC/5tRrufTbnU59DrSEXJ/calsejEFl8Y57+2tTZcM6ZCsr07X3GwpKt3uHoKus40rsB6VzGlDjC4PDWyCiACIgJO53mM01PH28M0F116wwoGzxYjcUQ3GBGiye+lbsVAx4dhjrm9CftUDweyfpuEeMVa3GeRtqf88KqTiNsNOTKToY1EeFO2MLt8PTmUY7AwJI74515uGoDOQeQoS9i8xBQgeUHygUwR3KgltuY0nxFIAPiOAzplyKddmXTy6Gss/wALOzGDkXzOvdFbhbp5malnqlOUeAaTPnWJ+GsSmquHHcxB9DSe9cuoSjlgRoQa+tsV3iqblq22jKp8VBrWOZ90S4+D5QuJPMA9+x9qmXJ1WI96+mXOCWG3tLPcAKFb4ftj6YX/AKR+lX60fAtJ/9k="
//     },
//     {
//         name:"squirtle",
//         type:"water",
//         attack : 8,
//         defense:3,
//         url:"data:image/jpeg;base64,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"
//     },
//     {
//         name:"bulbasaur",
//         type:"grass",
//         attack : 5,
//         defense:7,
//         url:"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR6Ohjgx4AvGQ7uAeuPTBcON4vfnqoO5-hR2A&usqp=CAU"
//     },
//     {
//         name:"picachu",
//         type:"electric",
//         attack : 6,
//         defense:9,
//         url:"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTbTalGlnaQgm0h3c4IICDmaRe9315mGUuj3w&usqp=CAU"
//     },
//     {
//         name:"ponyta",
//         type:"fire",
//         attack : 6,
//         defense:9,
//         url:"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQENMBjQDBkxfpIzD5tIkT03Xkl-zChzyaeng&usqp=CAU"
//     },
// ]

export default function ViewAllPage(props){

    const pokemon = useSelector((state) => state.pokemon)
    const dispatch = useDispatch();
    const [index, setIndex] = useState(0)
    const [arena, setArena] = useState([])
    const [roster, setRoster] = useState([])
    const [searchTerm, setSearchTerm] = useState("")
    const [typeSearch, setTypeSearch] = useState("")
    const [dropDownOptions, setDropDownOption] = useState([])
    const [winner, setWinner] = useState("")
    const [isFighting, setIsFighting] = useState(false)
    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    useEffect(()=>{
        dispatch(fetchPokemonInitialData())
    },[])

    useEffect(()=>{
        const uniqueType = [...new Set(pokemon.map(p => p.type).filter(type => type !== null))]
        const addAllOption = ["all",...uniqueType]
        setDropDownOption(addAllOption)
        setRoster(pokemon)
    },[pokemon])
    console.log(roster)
    //
    // useEffect(()=>{
    //     if (searchTerm && searchTerm !== ""){
    //         const filteredPokemon = pokemon.filter(p => {
    //             return p.name.toLowerCase().includes(searchTerm.toLowerCase())
    //         })
    //         setRoster(filteredPokemon)
    //         setIndex(0)
    //     }
    //     else if(typeSearch && typeSearch !== "all"){
    //         const filteredPokemon = pokemon.filter(pokemon => {
    //             return pokemon.type.toLowerCase().includes(typeSearch.toLowerCase())
    //         })
    //         setRoster(filteredPokemon)
    //         setIndex(0)
    //     }
    //     else{
    //     setRoster(pokemon)
    //     }
    // },[searchTerm,typeSearch])

    const nextSlide = () =>{
       setIndex(index + 1)
    }
    const previousSlide = () =>{
        setIndex(index - 1)
    }

    const handleSelectForArena = (e,index) => {

        setArena([...arena,roster[index]])
        roster.splice(index, 1)
        setIndex(0)
    }
    const handleReturnToRoster = (e,index) => {
        setRoster([...roster,arena[index]])
        arena.splice(index, 1)
    }
    function searchHandler(input){
        console.log(input)
        setSearchTerm(input)
    }
    function dropDownValue(input){
        setTypeSearch(input)
    }
    function setToFalse (){
        setIsFighting(false)
        handleOpen()

    }
    function handleFight(){
        setIsFighting(true)
        setTimeout(setToFalse,2300)
        const winner = []
        arena.map((fighter) =>{
            winner.push(fighter.attack+fighter.defense)
        })
        if(winner[0]>winner[1]){
            setWinner(arena[0].name)
        }
        else{
            setWinner(arena[1].name)
        }
    }
    return(
        <Fragment>
            <div>
                <SearchBar
                    searchTerm={searchTerm}
                    onChange={searchHandler}
                    placeHolder={"Search For Fighter"}
                />
                <DropDown
                    dropDownOptions={dropDownOptions}
                    dropDownValue={dropDownValue}
                />
            </div>
            <div>
                {(roster.length > 0)
                    ?
                    <ViewAllCard
                        index={index}
                        name={roster[index]?.name}
                        type={roster[index]?.type}
                        attack={roster[index]?.attack}
                        defense={roster[index]?.defense}
                        url={roster[index]?.url}
                        nextSlide={nextSlide}
                        previousSlide={previousSlide}
                        sendToArena={handleSelectForArena}
                        lastSlide={roster?.length - 1}
                        disableSelect={roster.length === 2}
                    />
                    :
                    <h3>
                        No PokeMon Results Available
                    </h3>
                }
            </div>
            <div className={"Arena"}>
                {
                    arena?.map((pokemon,index) =>
                            <ArenaCard
                                key={index}
                                index={index}
                                name={pokemon.name}
                                type={pokemon.type}
                                attack={pokemon.attack}
                                defense={pokemon.defense}
                                url={pokemon.url}
                                returnToRoster={handleReturnToRoster}
                            />
                    )
                }
            </div>
            <div>
                {(arena?.length >= 2)
                    &&
                    <div className={"buttonContainer"} >
                        {(!isFighting && !winner)&&
                            <BasicButton
                                className={"buttonColor"}
                                name={"Lets Get it on"}
                                color={"success"}
                                onClick={handleFight}
                            />}
                        {(isFighting) &&
                            <img src="https://media2.giphy.com/media/HZpCCbcWc0a3u/giphy.gif?cid=ecf05e47vbxelk7bxwnf0bu0rs0qxq28amnvjkszqjpzeksj&rid=giphy.gif&ct=g"/>
                        }

                    </div>
                }
            </div>
            <div>
                <Modal
                    open={open}
                    onClose={handleClose}
                    aria-labelledby="modal-modal-title"
                    aria-describedby="modal-modal-description"
                >
                    <Box sx={style}>
                        <Typography id="modal-modal-title" variant="h6" component="h2">
                            Winner!!!
                        </Typography>
                        <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                            {winner.toUpperCase()}
                        </Typography>
                    </Box>
                </Modal>
            </div>
        </Fragment>
    )

}