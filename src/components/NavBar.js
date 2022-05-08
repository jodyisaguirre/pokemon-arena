import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import AdbIcon from '@mui/icons-material/Adb';
import {Link} from 'react-router-dom'

const pages = [
    {
        page: 'Pokedex',
        path:'/'
    },
    {
        page: 'Catch em All',
        path:'/catchemall'
    },
    {
        page: 'Arena',
        path:'/arena'
    }

    ]
;
const settings = ['Profile', 'Account', 'Dashboard', 'Logout'];

const ResponsiveAppBar = () => {
    const [anchorElNav, setAnchorElNav] = React.useState(null);
    const [anchorElUser, setAnchorElUser] = React.useState(null);

    const handleOpenNavMenu = (event) => {
        setAnchorElNav(event.currentTarget);
    };
    const handleOpenUserMenu = (event) => {
        setAnchorElUser(event.currentTarget);
    };

    const handleCloseNavMenu = () => {
        setAnchorElNav(null);
    };

    const handleCloseUserMenu = () => {
        setAnchorElUser(null);
    };

    return (
        <AppBar position="static" >
            <Container maxWidth="xl">
                <Toolbar disableGutters  color="Delete">
                    <Avatar src="data:image/png;base64,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" />
                    <Typography
                        variant="h6"
                        noWrap
                        component="a"
                        href="/"
                        sx={{
                            mr: 2,
                            display: { xs: 'none', md: 'flex' },
                            fontFamily: 'monospace',
                            fontWeight: 700,
                            letterSpacing: '.3rem',
                            color: 'inherit',
                            textDecoration: 'none',
                        }}
                    >
                        POKEMON
                    </Typography>

                    <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
                        <IconButton
                            size="large"
                            aria-label="account of current user"
                            aria-controls="menu-appbar"
                            aria-haspopup="true"
                            onClick={handleOpenNavMenu}
                            color="inherit"
                        >
                            <MenuIcon />
                        </IconButton>
                        <Menu
                            id="menu-appbar"
                            anchorEl={anchorElNav}
                            anchorOrigin={{
                                vertical: 'bottom',
                                horizontal: 'left',
                            }}
                            keepMounted
                            transformOrigin={{
                                vertical: 'top',
                                horizontal: 'left',
                            }}
                            open={Boolean(anchorElNav)}
                            onClose={handleCloseNavMenu}
                            sx={{
                                display: { xs: 'block', md: 'none' },
                            }}
                        >
                            {/*{pages.map((page) => (*/}
                            {/*    <MenuItem key={page} onClick={handleCloseNavMenu}>*/}
                            {/*        <Typography textAlign="center">{page}</Typography>*/}
                            {/*    </MenuItem>*/}
                            {/*))}*/}
                        </Menu>
                    </Box>
                    <AdbIcon sx={{ display: { xs: 'flex', md: 'none' }, mr: 1 }} />
                    <Typography
                        variant="h5"
                        noWrap
                        component="a"
                        href=""
                        sx={{
                            mr: 2,
                            display: { xs: 'flex', md: 'none' },
                            flexGrow: 1,
                            fontFamily: 'monospace',
                            fontWeight: 700,
                            letterSpacing: '.3rem',
                            color: 'inherit',
                            textDecoration: 'none',
                        }}
                    >
                        LOGO
                    </Typography>
                    <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
                        {
                            pages.map(page => <Link to={page.path}>{page.page}  |</Link>)
                        }
                    </Box>

                    <Box sx={{ flexGrow: 0 }}>
                        <Tooltip title="Open settings">
                            <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                                <Avatar alt="Remy Sharp" src="data:image/png;base64,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" />
                            </IconButton>
                        </Tooltip>
                        <Menu
                            sx={{ mt: '45px' }}
                            id="menu-appbar"
                            anchorEl={anchorElUser}
                            anchorOrigin={{
                                vertical: 'top',
                                horizontal: 'right',
                            }}
                            keepMounted
                            transformOrigin={{
                                vertical: 'top',
                                horizontal: 'right',
                            }}
                            open={Boolean(anchorElUser)}
                            onClose={handleCloseUserMenu}
                        >
                            {settings.map((setting) => (
                                <MenuItem key={setting} onClick={handleCloseUserMenu}>
                                    <Typography textAlign="center">{setting}</Typography>
                                </MenuItem>
                            ))}
                        </Menu>
                    </Box>
                </Toolbar>
            </Container>
        </AppBar>
    );
};
export default ResponsiveAppBar;