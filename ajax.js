function normalize_url(url)
{
    if(url.indexOf('://') >= 0)
    {
        // Absolute URL provided; return as-is.
        return url;
    }
    else
    {
        // Relative URL provided; figure out the document base and prepend it.
        base = document.location.href;
        if(base.lastIndexOf('/') >= 0)
            base = base.substring(0, base.lastIndexOf('/') + 1);
        return base + url;
    }
}

function urlencode(obj)
{
    var res = ''
    for (var key in obj) {
        if (res != '') res += '&'
        res += encodeURIComponent(key) + '=' + encodeURIComponent(obj[key])
    }
    return res
}

function request(url, callback, method, content, type)
{
    if(method == null) method = "GET";
    if(content == null) content = "";
    if(type == null) type = "application/x-www-form-urlencoded";

    // Create request object
    var req;
    if(window.ActiveXObject)
        req = new ActiveXObject("Microsoft.XMLHTTP");
    else
    if(window.XMLHttpRequest)
        req = new XMLHttpRequest();
    else
        return false;

    req.onreadystatechange = function() {
            if(req.readyState == 4)
                callback(req);
        };

    if (typeof(content) == 'object') {
        content = urlencode(content)
    }

    if (content != '' && method == 'GET') {
        url += (url.indexOf('?') > 0 ? '&' : '?') + content
        content = ''
    }

    req.open(method, normalize_url(url), true);
    req.setRequestHeader("Content-Type", type);
    req.setRequestHeader("Content-Length", content.length)
    req.send(content);
    return true;
}
